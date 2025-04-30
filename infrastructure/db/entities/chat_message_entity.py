import datetime

from sqlalchemy import UUID, Column, DateTime
from sqlalchemy import Enum as SQLAlchemyEnum
from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import relationship

from domain.models.chat_message import ChatMessage
from domain.models.chat_role import ChatRole
from infrastructure.db.base import Base


class ChatMessageEntity(Base):
    __tablename__ = "chat_messages"

    id = Column(UUID, primary_key=True, index=True)
    role = Column(SQLAlchemyEnum(ChatRole), nullable=False)
    content = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
    conversation_id = Column(
        UUID(as_uuid=True), ForeignKey("conversations.id"), nullable=False
    )

    conversation = relationship("ConversationEntity", back_populates="messages")

    def to_domain(self) -> ChatMessage:
        return ChatMessage(
            id=self.id,
            content=self.content,
            role=self.role,
            conversation_id=self.conversation_id,
            created_at=self.created_at.isoformat(),
        )

    @staticmethod
    def from_domain(model: ChatMessage):
        return ChatMessageEntity(
            id=model.id,
            role=model.role,
            content=model.content,
            conversation_id=model.conversation_id,
        )
