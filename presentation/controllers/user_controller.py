from fastapi import APIRouter, Depends

from domain.models.user import User
from domain.usecases.create_user.create_user_request import CreateUserRequest
from domain.usecases.create_user.create_user_usecase import CreateUserUseCase


user_router = APIRouter(prefix="/users")


@user_router.post("")
async def signup(
    request: CreateUserRequest, usecase: CreateUserUseCase = Depends()
) -> User:
    return await usecase.execute(request=request)
