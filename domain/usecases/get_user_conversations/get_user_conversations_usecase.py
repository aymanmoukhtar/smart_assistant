from fastapi import Depends

from domain.usecases.get_user_conversations.get_user_conversations_response import (
    UserConversation,
    UserConversationsResponse,
)
from infrastructure.repositories.chat_repository import ChatRepository


class GetUserConversationsUseCase:
    def __init__(self, repository: ChatRepository = Depends()) -> None:
        self.__repository = repository

    async def execute(
        self,
        user_id: str,
    ) -> UserConversationsResponse:
        conversations = await self.__repository.get_by_user_id(user_id)
        return UserConversationsResponse(
            conversations=[
                UserConversation(
                    id=str(conversation.id),
                    title=conversation.title,
                    created_at=conversation.created_at,
                )
                for conversation in conversations
            ]
        )
