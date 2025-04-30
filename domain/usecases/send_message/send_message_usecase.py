import uuid
from typing import AsyncGenerator

from fastapi import Depends

from domain.models.chat_message import ChatMessage
from domain.models.chat_role import ChatRole
from domain.models.conversation import Conversation
from domain.usecases.send_message.send_message_request import SendMessageRequest
from infrastructure.gateways.chat_gateway import ChatGateway
from infrastructure.repositories.chat_repository import ChatRepository


class SendMessageUseCase:
    def __init__(
        self, gateway: ChatGateway = Depends(), repository: ChatRepository = Depends()
    ) -> None:
        self.__gateway = gateway
        self.__repository = repository

    async def execute(
        self,
        user_id: str,
        request: SendMessageRequest,
    ) -> AsyncGenerator[str, None]:
        conversation: Conversation

        if not request.conversation_id:
            conversation_title = await self.__gateway.generate_prompt_title(
                request.content
            )
            conversation = Conversation(
                id=str(uuid.uuid4()),
                user_id=user_id,
                title=conversation_title,
                messages=[],
            )
            conversation = await self.__repository.create_conversation(
                conversation=conversation
            )

            yield f"TITLE: {conversation_title}"
        else:
            conversation = await self.__repository.find_by_id(request.conversation_id)

        user_message = ChatMessage(
            id=str(uuid.uuid4()),
            content=request.content,
            role=ChatRole.USER,
            conversation_id=conversation.id,
        )
        await self.__repository.create_message(user_message)

        message_id = str(uuid.uuid4())
        full_reply = ""

        async for chunk in self.__gateway.stream_message(
            conversation.messages + [user_message]
        ):
            yield f"DATA: {chunk}"
            full_reply += chunk

        yield f"FULL: {full_reply}"
        yield f"\nDONE"

        print(conversation_title)
        print(full_reply)

        await self.__repository.create_message(
            ChatMessage(
                id=message_id,
                content=full_reply,
                role=ChatRole.ASSISTANT,
                conversation_id=conversation.id,
            )
        )
