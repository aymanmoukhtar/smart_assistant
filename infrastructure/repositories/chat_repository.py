from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from domain.models.chat_message import ChatMessage
from domain.models.conversation import Conversation
from domain.models.user import User
from infrastructure.db.database import get_db
from infrastructure.db.entities.chat_message_entity import ChatMessageEntity
from infrastructure.db.entities.conversation_entity import ConversationEntity


class ChatRepository:
    def __init__(self, db: AsyncSession = Depends(get_db)) -> None:
        self.__db = db

    async def create_conversation(self, conversation: Conversation) -> User:
        entity = await ConversationEntity.from_domain(conversation)

        self.__db.add(entity)
        await self.__db.commit()
        await self.__db.refresh(entity)

        return await entity.to_domain()

    async def find_by_id(self, id: str) -> Conversation | None:
        result = await self.__db.execute(
            select(ConversationEntity).where(ConversationEntity.id == id)
        )
        return (
            conversation := result.scalar_one_or_none()
        ) and await conversation.to_domain()

    async def create_message(self, message: ChatMessage) -> ChatMessage:
        entity = ChatMessageEntity.from_domain(message)

        self.__db.add(entity)
        await self.__db.commit()
        await self.__db.refresh(entity)

        return entity.to_domain()
