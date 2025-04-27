from domain.models.chat_message import ChatMessage


class Conversation:
    id: str
    user_id: str
    title: str
    messages: list[ChatMessage]