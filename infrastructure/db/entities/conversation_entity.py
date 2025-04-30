import datetime

from sqlalchemy import UUID, Column, DateTime, ForeignKey, String
from sqlalchemy.orm import relationship

from domain.models.conversation import Conversation
from infrastructure.db.base import Base


class ConversationEntity(Base):
    __tablename__ = "conversations"

    id = Column(UUID, primary_key=True, index=True)
    title = Column(String, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
    user = relationship("UserEntity", back_populates="conversations")

    messages = relationship(
        "ChatMessageEntity",
        back_populates="conversation",
        order_by="ChatMessageEntity.created_at",
    )

    def to_domain(self) -> Conversation:
        return Conversation(
            id=self.id,
            user_id=self.user_id,
            title=self.title,
            created_at=self.created_at.isoformat(),
            messages=[message.to_domain() for message in self.messages],
        )

    @staticmethod
    def from_domain(model: Conversation):
        return ConversationEntity(
            id=model.id,
            title=model.title,
            user_id=model.user_id,
        )
