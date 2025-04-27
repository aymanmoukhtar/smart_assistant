from domain.models.chat_role import ChatRole


class ChatMessage:
    id: str
    content: str
    role: ChatRole