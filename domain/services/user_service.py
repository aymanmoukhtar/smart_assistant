from domain.models.user import User


class UserService:
    __pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    __ALGORITHM = "HS256"
    __ACCESS_TOKEN_EXPIRE_MINUTES = 30

    def verify_password(self, plain_password: str, hashed_password: str):
        return self.__pwd_context.verify(plain_password, hashed_password)

    def get_password_hash(self, password: str):
        return self.__pwd_context.hash(password)
