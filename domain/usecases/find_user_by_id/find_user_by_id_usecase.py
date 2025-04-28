from fastapi import Depends

from domain.exceptions.not_found_exception import NotFoundException
from domain.models.user import User
from infrastructure.repositories.user_repository import UserRepository


class FindUserByIdUseCase:
    def __init__(self, repository: UserRepository = Depends()) -> None:
        self.__repository = repository

    async def execute(self, id: str) -> User:
        user = await self.__repository.find_by_id(id)

        if user is None:
            raise NotFoundException(f"User not found")

        return user
