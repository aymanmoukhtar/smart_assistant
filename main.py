from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from domain.exceptions.domain_exception import DomainException
from presentation.controllers.chat_controller import chat_router
from presentation.controllers.user_controller import user_router

app = FastAPI(
    title="Smart Assistant",
    description="A FastAPI-based smart assistant application",
    version="0.1.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 🔓 Allow all origins (safe for dev only)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
