from sqlalchemy import Column, ForeignKey, String, UUID
from sqlalchemy.orm import relationship

from infrastructure.db.base import Base

class Conversation(Base):
    __tablename__ = "conversations"
    
    id = Column(UUID, primary_key=True, index=True)
    title = Column(String, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    user = relationship("UserEntity", back_populates="conversations")
