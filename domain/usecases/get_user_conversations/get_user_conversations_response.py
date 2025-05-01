from dataclasses import dataclass


@dataclass
class UserConversation:
    id: str
    title: str
    created_at: str


@dataclass
class UserConversationsResponse:
    conversations: list[UserConversation]
