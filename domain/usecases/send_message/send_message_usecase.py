import json
import uuid
from typing import AsyncGenerator

from fastapi import Depends

from domain.models.chat_message import ChatMessage
from domain.models.chat_role import ChatRole
from domain.models.conversation import Conversation
from domain.usecases.send_message.send_message_request import SendMessageRequest
from infrastructure.agents.conversation_agent import ConversationAgent
from infrastructure.agents.html_converter_agent import HTMLConverterAgent
from infrastructure.agents.title_agent import TitleGeneratorAgent
from infrastructure.repositories.chat_repository import ChatRepository


class SendMessageUseCase:
    def __init__(
        self,
        repository: ChatRepository = Depends(),
        title_generator: TitleGeneratorAgent = Depends(),
        conversation_agent: ConversationAgent = Depends(),
        html_converter_agent: HTMLConverterAgent = Depends()
    ) -> None:
        self.__repository = repository
        self.__title_generator = title_generator
        self.__conversation_agent = conversation_agent
        self.__html_converter_agent = html_converter_agent

    __SEPARATOR = "|||END|||"

    async def execute(
        self,
        user_id: str,
        request: SendMessageRequest,
    ) -> AsyncGenerator[str, None]:
        conversation: Conversation

        if not request.conversation_id:
            conversation_title = await self.__title_generator.execute(request.content)
            conversation = Conversation(
                id=str(uuid.uuid4()),
                user_id=user_id,
                title=conversation_title,
                messages=[],
            )
            conversation = await self.__repository.create_conversation(
                conversation=conversation
            )
            yield json.dumps(
                {
                    "event": "init",
                    "conversation_id": str(conversation.id),
                    "title": conversation_title,
                }
            ) + self.__SEPARATOR

        else:
            conversation = await self.__repository.find_by_id(request.conversation_id)
            yield json.dumps(
                {
                    "event": "init",
                    "conversation_id": str(conversation.id),
                    "title": conversation.title,
                }
            ) + self.__SEPARATOR

        user_message = ChatMessage(
            id=request.id,
            content=request.content,
            role=ChatRole.USER,
            conversation_id=conversation.id,
        )

        full_reply = ""
        new_message_id = str(uuid.uuid4())
        async for chunk in self.__conversation_agent.execute(
            conversation.messages + [user_message]
        ):
            async for html_chunk in self.__html_converter_agent.execute(chunk):
                yield json.dumps(
                    {"event": "chunk", "chunk": html_chunk, "message_id": new_message_id}
                ) + self.__SEPARATOR
                full_reply += html_chunk

        yield json.dumps(
            {"event": "end", "full_message": full_reply, "message_id": new_message_id}
        )

        await self.__repository.create_message(user_message),
        await self.__repository.create_message(
            ChatMessage(
                id=new_message_id,
                content=full_reply,
                role=ChatRole.ASSISTANT,
                conversation_id=conversation.id,
            )
        )
