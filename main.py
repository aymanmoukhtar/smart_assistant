from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from domain.exceptions.base_exception import DomainException
from domain.exceptions.user_already_exists_exception import UserAlreadyExistsException
from presentation.controllers.chat_controller import chat_router
from presentation.controllers.user_controller import user_router
from starlette.status import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT

app = FastAPI(
    title="Smart Assistant",
    description="A FastAPI-based smart assistant application",
    version="0.1.0",
)

app.include_router(chat_router)
app.include_router(user_router)

EXCEPTION_STATUS_CODES = {
    UserAlreadyExistsException: HTTP_409_CONFLICT,
}

@app.exception_handler(DomainException)
async def app_exception_handler(request: Request, exc: DomainException):
    status_code = EXCEPTION_STATUS_CODES.get(type(exc), 500)

    return JSONResponse(
        status_code=status_code,
        content={
            "error": {
                "code": status_code,
                "message": exc.message,
            }
        },
    )