from dataclasses import dataclass

from starlette.status import HTTP_403_FORBIDDEN

from domain.exceptions.domain_exception import DomainException


@dataclass
class ForbiddenException(DomainException):
    message: str
    code: int = HTTP_403_FORBIDDEN
