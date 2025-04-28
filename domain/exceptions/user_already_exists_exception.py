from dataclasses import dataclass

from starlette.status import HTTP_409_CONFLICT

from domain.exceptions.domain_exception import DomainException


@dataclass
class UserAlreadyExistsException(DomainException):
    message: str
    code: int = HTTP_409_CONFLICT
