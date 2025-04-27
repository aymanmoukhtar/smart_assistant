from fastapi import Depends
from domain.usecases.send_message.send_message_request import SendMessageRequest
from infrastructure.gateways.chat_gateway import ChatGateway


class SendMessageUseCase:
    def __init__(self, gateway: ChatGateway = Depends()) -> None:
        self.__gateway = gateway

    async def execute(
        self,
        request: SendMessageRequest,
    ) -> str:
        # Create a new conversation if no conversation_id is passed
       return await self.__gateway.send_message(request.content)
