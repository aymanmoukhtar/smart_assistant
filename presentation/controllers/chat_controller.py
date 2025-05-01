from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse

from domain.models.user import User
from domain.usecases.get_conversation_messages.get_converation_messages_usecase import (
    GetConversationMessagesUseCase,
)
from domain.usecases.get_conversation_messages.get_conversation_messages_response import (
    ConversationMessagesResponse,
)
from domain.usecases.get_user_conversations.get_user_conversations_response import (
    UserConversationsResponse,
)
from domain.usecases.get_user_conversations.get_user_conversations_usecase import (
    GetUserConversationsUseCase,
)
from domain.usecases.send_message.send_message_request import SendMessageRequest
from domain.usecases.send_message.send_message_usecase import SendMessageUseCase
from presentation.controllers.user_controller import get_current_from_token

chat_router = APIRouter(prefix="/chat")


@chat_router.get("/user-conversations")
async def get_user_conversations(
    usecase: GetUserConversationsUseCase = Depends(),
    user: User = Depends(get_current_from_token),
) -> UserConversationsResponse:
    return await usecase.execute(user.id)


@chat_router.get("/conversations/{conversation_id}/messages")
async def get_conversation_messages(
    conversation_id: str,
    usecase: GetConversationMessagesUseCase = Depends(),
    user: User = Depends(get_current_from_token),
) -> ConversationMessagesResponse:
    return await usecase.execute(conversation_id=conversation_id, user_id=user.id)


@chat_router.post("/messages", response_class=StreamingResponse)
async def send_message(
    request: SendMessageRequest,
    usecase: SendMessageUseCase = Depends(),
    user: User = Depends(get_current_from_token),
):
    return StreamingResponse(
        usecase.execute(user.id, request), media_type="text/event-stream"
    )
