import jwt
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from domain.models.user import User
from domain.models.user_tokens import UserTokens
from domain.usecases.create_user.create_user_request import CreateUserRequest
from domain.usecases.create_user.create_user_usecase import CreateUserUseCase
from domain.usecases.find_user_by_id.find_user_by_id_usecase import FindUserByIdUseCase
from domain.usecases.login.login_request import LoginRequest
from domain.usecases.login.login_usecase import LoginUseCase
from infrastructure.app_config import AppConfig

user_router = APIRouter(prefix="/users")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def get_current_from_token(
    token: str = Depends(oauth2_scheme), usecase: FindUserByIdUseCase = Depends()
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unauthorized",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, AppConfig.JWT_SECRET_KEY, algorithms=["HS256"])
        id = payload.get("id")
        if id is None:
            raise credentials_exception
    except jwt.InvalidTokenError:
        raise credentials_exception
    user = await usecase.execute(id)
    if user is None:
        raise credentials_exception

    return user


@user_router.post("", status_code=status.HTTP_201_CREATED)
async def signup(request: CreateUserRequest, usecase: CreateUserUseCase = Depends()) -> UserTokens:
    return await usecase.execute(request=request)


@user_router.post("/login")
async def login(request: LoginRequest, usecase: LoginUseCase = Depends()) -> UserTokens:
    return await usecase.execute(request=request)


@user_router.get("/me")
async def me(user: User = Depends(get_current_from_token)) -> User:
    return user
