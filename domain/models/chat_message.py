import datetime
from dataclasses import dataclass

from domain.models.chat_role import ChatRole


@dataclass
class ChatMessage:
    id: str
    content: str
    role: ChatRole
    conversation_id: str
    created_at: str = datetime.datetime.now(datetime.UTC)
