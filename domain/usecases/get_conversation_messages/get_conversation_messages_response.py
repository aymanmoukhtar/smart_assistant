from dataclasses import dataclass

from domain.models.chat_role import ChatRole


@dataclass
class ConversationMessageResponse:
    id: str
    content: str
    role: ChatRole
    created_at: str


@dataclass
class ConversationMessagesResponse:
    messages: list[ConversationMessageResponse]
