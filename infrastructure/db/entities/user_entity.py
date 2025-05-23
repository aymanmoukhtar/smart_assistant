from sqlalchemy import UUID, Boolean, Column, Integer, String
from sqlalchemy.orm import relationship

from domain.models.user import User
from infrastructure.db.base import Base


class UserEntity(Base):
    __tablename__ = "users"

    id = Column(UUID, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    conversations = relationship("ConversationEntity", back_populates="user")

    def to_domain(self) -> User:
        return User(
            id=self.id, name=self.name, email=self.email, password=self.password
        )

    @staticmethod
    def from_domain(model: User):
        return UserEntity(
            id=model.id,
            name=model.name,
            email=model.email,
            password=model.password,
        )
