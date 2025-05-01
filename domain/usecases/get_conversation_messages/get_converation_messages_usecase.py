from fastapi import Depends

from domain.exceptions.forbidden_exception import ForbiddenException
from domain.exceptions.not_found_exception import NotFoundException
from domain.usecases.get_conversation_messages.get_conversation_messages_response import (
    ConversationMessageResponse,
    ConversationMessagesResponse,
)
from domain.usecases.get_user_conversations.get_user_conversations_response import (
    UserConversationsResponse,
)
from infrastructure.repositories.chat_repository import ChatRepository


class GetConversationMessagesUseCase:
    def __init__(self, repository: ChatRepository = Depends()) -> None:
        self.__repository = repository

    async def execute(
        self,
        conversation_id: str,
        user_id: str,
    ) -> UserConversationsResponse:
        conversation = await self.__repository.find_by_id(conversation_id)

        if not conversation:
            raise NotFoundException(f"Conversation with id {conversation_id} not found")

        if conversation.user_id != user_id:
            raise ForbiddenException(
                f"User {user_id} not allowed to view this conversation"
            )

        messages = await self.__repository.get_conversation_messages(
            conversation_id=conversation_id
        )

        return ConversationMessagesResponse(
            messages=[
                ConversationMessageResponse(
                    id=str(message.id),
                    content=message.content,
                    role=message.role,
                    created_at=message.created_at,
                )
                for message in messages
            ]
        )
