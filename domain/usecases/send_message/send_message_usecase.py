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
                        content=f"""
                            Give me a title for an AI conversation based on this user message: {request.content}.
                            Don't type anything after or before, just return a title that is not more than 6 words.
                        """,
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

        message_id = str(uuid.uuid4())
        full_reply = ""
        async for chunk in self.__gateway.stream_message(
            conversation.messages + [user_message]
        ):
            chunk_message = ChatMessage(
                id=message_id,
                content=chunk,
                role=ChatRole.ASSISTANT,
                conversation_id=conversation.id,
            )
            full_reply += chunk

        full_reply_message = await self.__repository.create_message(
            ChatMessage(
                id=message_id,
                content=full_reply,
                role=ChatRole.ASSISTANT,
                conversation_id=conversation.id,
            )
        )

        return full_reply_message
