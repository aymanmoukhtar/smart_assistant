from dataclasses import dataclass

from infrastructure.db.entities.user_entity import UserEntity


@dataclass
class LoginRequest:
    email: str
    password: str
