from pydantic import BaseModel


class SendMessageRequest(BaseModel):
    id: str
    content: str
    conversation_id: str
