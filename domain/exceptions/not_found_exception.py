from dataclasses import dataclass

from starlette.status import HTTP_404_NOT_FOUND

from domain.exceptions.domain_exception import DomainException


@dataclass
class NotFoundException(DomainException):
    message: str
    code: int = HTTP_404_NOT_FOUND
