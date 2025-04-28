from fastapi import Depends

from domain.exceptions.unauthenticated_exception import UnAuthenticatedException
from domain.models.user import User
from domain.models.user_tokens import UserTokens
from domain.usecases.login.login_request import LoginRequest
from infrastructure.repositories.user_repository import UserRepository


class LoginUseCase:
    def __init__(self, repository: UserRepository = Depends()) -> None:
        self.__repository = repository

    async def execute(
        self,
        request: LoginRequest,
    ) -> User:
        user = await self.__repository.find_by_email(request.email)

        if user is None:
            raise UnAuthenticatedException(f"Email or password are incorrect")

        if not user.verify_password(request.password):
            raise UnAuthenticatedException(f"Email or password are incorrect")

        return UserTokens(access_token=user.create_access_token())
