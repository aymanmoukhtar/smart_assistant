from fastapi import Depends
from domain.exceptions.user_already_exists_exception import UserAlreadyExistsException
from domain.models.user import User
from domain.usecases.create_user.create_user_request import CreateUserRequest
from infrastructure.db.entities.user_entity import UserEntity
from infrastructure.gateways.chat_gateway import ChatGateway
from infrastructure.repositories.user_repository import UserRepository


class CreateUserUseCase:
    def __init__(self, repository: UserRepository = Depends()) -> None:
        self.__repository = repository

    async def execute(
        self,
        request: CreateUserRequest,
    ) -> User:
        existing = await self.__repository.find_by_email(request.email)
        
        if (existing):
            raise UserAlreadyExistsException(f"User with email {request.email} already exists")
        
        return await self.__repository.create(request.to_domain())
