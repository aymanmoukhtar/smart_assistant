from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from domain.exceptions.domain_exception import DomainException
from domain.exceptions.user_already_exists_exception import UserAlreadyExistsException
from presentation.controllers.chat_controller import chat_router
from presentation.controllers.user_controller import user_router

app = FastAPI(
    title="Smart Assistant",
    description="A FastAPI-based smart assistant application",
    version="0.1.0",
)

app.include_router(chat_router)
app.include_router(user_router)


@app.exception_handler(DomainException)
async def app_exception_handler(_: Request, exc: DomainException):

    return JSONResponse(
        status_code=exc.code,
        content={
            "error": {
                "status_code": exc.code,
                "message": exc.message,
            }
        },
    )
