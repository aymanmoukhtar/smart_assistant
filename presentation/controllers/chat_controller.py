from fastapi import APIRouter, Depends

from domain.models.user import User
from domain.usecases.send_message.send_message_request import SendMessageRequest
from domain.usecases.send_message.send_message_usecase import SendMessageUseCase
from presentation.controllers.user_controller import get_current_from_token

chat_router = APIRouter(prefix="/chat")


@chat_router.post("/messages")
async def send_message(
    request: SendMessageRequest,
    usecase: SendMessageUseCase = Depends(),
    user: User = Depends(get_current_from_token),
) -> dict:
    return {"data": await usecase.execute(user.id, request)}
