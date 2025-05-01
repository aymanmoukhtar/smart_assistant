from fastapi import Depends
from sqlalchemy import desc, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

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
        entity = ConversationEntity.from_domain(conversation)

        self.__db.add(entity)
        await self.__db.commit()
        await self.__db.refresh(entity, ["messages"])

        return entity.to_domain()

    async def find_by_id(self, id: str) -> Conversation | None:
        result = await self.__db.execute(
            select(ConversationEntity)
            .options(selectinload(ConversationEntity.messages))
            .where(ConversationEntity.id == id)
        )
        return (
            conversation := result.scalar_one_or_none()
        ) and conversation.to_domain()

    async def get_by_user_id(self, user_id: str) -> list[Conversation]:
        result = await self.__db.execute(
            select(ConversationEntity)
            .where(ConversationEntity.user_id == user_id)
            .order_by(desc(ConversationEntity.created_at))
        )
        return [
            conversation.to_domain(include_messages=False)
            for conversation in result.scalars().all()
        ]

    async def create_message(self, message: ChatMessage) -> ChatMessage:
        entity = ChatMessageEntity.from_domain(message)

        self.__db.add(entity)
        await self.__db.commit()
        await self.__db.refresh(entity)

        return entity.to_domain()

    async def get_conversation_messages(
        self, conversation_id: str
    ) -> list[ChatMessage]:
        result = await self.__db.execute(
            select(ChatMessageEntity)
            .where(ChatMessageEntity.conversation_id == conversation_id)
            .order_by(ChatMessageEntity.created_at)
        )

        return [message.to_domain() for message in result.scalars().all()]
