from dataclasses import dataclass

from pydantic import BaseModel

from domain.models.user import User


@dataclass
class CreateUserRequest(BaseModel):
    id: str
    name: str
    email: str
    password: str

    def to_domain(self) -> User:
        return User(
            id=self.id, name=self.name, email=self.email, password=self.password
        )
