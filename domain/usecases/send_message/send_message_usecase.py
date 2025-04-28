import uuid

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
    ) -> str:
        conversation: Conversation

        if not request.conversation_id:
            conversation_title = await self.__gateway.send_message(
                [
                    ChatMessage(
                        id=str(uuid.uuid4()),
                        content=f"Give me a title for an AI conversation based on this user message: {request.content}, don't type anything after or before, just return a 3-4 words title.",
                        role=ChatRole.USER,
                        conversation_id="",
                    )
                ]
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
        else:
            conversation = await self.__repository.find_by_id(request.conversation_id)

        user_message = ChatMessage(
            id=str(uuid.uuid4()),
            content=request.content,
            role=ChatRole.USER,
            conversation_id=conversation.id,
        )
        await self.__repository.create_message(user_message)

        reply = await self.__gateway.send_message(
            conversation.messages + [user_message]
        )
        reply_message = await self.__repository.create_message(
            ChatMessage(
                id=str(uuid.uuid4()),
                content=reply,
                role=ChatRole.ASSISTANT,
                conversation_id=conversation.id,
            )
        )

        return reply_message
