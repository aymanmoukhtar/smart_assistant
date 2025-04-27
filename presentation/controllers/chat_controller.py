from fastapi import APIRouter, Depends

from domain.usecases.send_message.send_message_request import SendMessageRequest
from domain.usecases.send_message.send_message_usecase import SendMessageUseCase


chat_router = APIRouter(prefix="/chat")


@chat_router.post("/messages")
async def send_message(
    request: SendMessageRequest, usecase: SendMessageUseCase = Depends()
) -> dict:
    return {"data": await usecase.execute(request)}
