from dataclasses import dataclass

from starlette.status import HTTP_401_UNAUTHORIZED

from domain.exceptions.domain_exception import DomainException


@dataclass
class UnAuthenticatedException(DomainException):
    message: str
    code: int = HTTP_401_UNAUTHORIZED
