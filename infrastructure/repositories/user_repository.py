from fastapi import Depends
from sqlalchemy import select

from domain.models.user import User
from infrastructure.db.database import get_db
from infrastructure.db.entities.user_entity import UserEntity
from sqlalchemy.ext.asyncio import AsyncSession


class UserRepository:
    def __init__(self, db: AsyncSession = Depends(get_db)) -> None:
        self.__db = db

    async def create(self, user: User) -> User:
        entity = UserEntity.from_domain(user)

        self.__db.add(entity)
        await self.__db.commit()
        await self.__db.refresh(entity)

        return entity.to_domain()

    async def find_by_id(self, id: str) -> User | None:
        result = await self.__db.execute(select(UserEntity).where(UserEntity.id == id))
        return (user := result.scalar_one_or_none()) and user.to_domain()
    
    async def find_by_email(self, email: str) -> User | None:
        result = await self.__db.execute(select(UserEntity).where(UserEntity.email == email))
        return (user := result.scalar_one_or_none()) and user.to_domain()