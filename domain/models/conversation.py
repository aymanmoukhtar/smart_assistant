import datetime
from dataclasses import dataclass

from domain.models.chat_message import ChatMessage


@dataclass
class Conversation:
    id: str
    user_id: str
    title: str
    messages: list[ChatMessage]
    created_at: str = datetime.datetime.now(datetime.UTC)
