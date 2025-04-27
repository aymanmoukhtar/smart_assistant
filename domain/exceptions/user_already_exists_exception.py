from dataclasses import dataclass
from domain.exceptions.base_exception import DomainException


@dataclass
class UserAlreadyExistsException(DomainException):
    message: str