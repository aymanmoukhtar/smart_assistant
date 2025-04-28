from dataclasses import dataclass
from datetime import datetime, timedelta, timezone

import jwt
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext

from infrastructure.app_config import AppConfig


@dataclass
class User:
    id: str
    name: str
    email: str
    password: str

    __pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    __oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
    __ACCESS_TOKEN_EXPIRE_MINUTES = 30

    def verify_password(self, plain_password: str) -> bool:
        return self.__pwd_context.verify(plain_password, self.password)

    def get_password_hash(self) -> str:
        return self.__pwd_context.hash(self.password)

    def create_access_token(self) -> str:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=self.__ACCESS_TOKEN_EXPIRE_MINUTES
        )
        encoded_jwt = jwt.encode(
            {"sub": self.email, "name": self.name, "id": str(self.id), "exp": expire},
            AppConfig.JWT_SECRET_KEY,
            algorithm="HS256",
        )
        return encoded_jwt
