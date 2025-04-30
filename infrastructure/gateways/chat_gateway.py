from typing import AsyncGenerator

from langchain.chat_models import init_chat_model
from langchain_core.messages import SystemMessage

from domain.models.chat_message import ChatMessage
from infrastructure.app_config import AppConfig

model = init_chat_model(
    "gpt-4o-mini", model_provider="openai", api_key=AppConfig.OPENAI_API_KEY
)


class ChatGateway:
    def __init__(self) -> None:
        self.__system_message = SystemMessage(
            """
        You are a highly intelligent and professional AI assistant.
        Your primary goal is to help users by answering their questions accurately based on the provided document context and prior conversation history.

        If you do not know an answer, or if the information is not available in the context, politely admit it rather than guessing.

        Respond clearly, concisely, and in a friendly tone.
        Where appropriate, suggest follow-up actions or questions the user might find helpful.

        Always prioritize factual correctness.

        Use simple, professional language.

        Stay on-topic and avoid irrelevant information.

        If document context is provided, cite it naturally (no need for explicit "source 1" unless asked).

        You are allowed to access tools if needed to complete tasks (such as searching, summarizing, or calculating).

        Remain calm, helpful, and attentive to user needs at all times.
        """
        )

    async def generate_prompt_title(self, message: str) -> str:
        response = await model.ainvoke(
            [
                SystemMessage(
                    """
                          You're a helpful assistant that generates titles for conversations based on a single prompt
                          Don't return anything other than the title. and it shouldn't be more than 6 words.
                          """
                ),
                f"User prompt to return the title for: {message}",
            ]
        )

        return response.content

    async def send_message(self, messages: list[ChatMessage]) -> str:
        response = await model.ainvoke(
            [self.__system_message]
            + [
                {"role": message.role.value, "content": message.content}
                for message in messages
            ]
        )

        return response.content

    async def stream_message(
        self, messages: list[ChatMessage]
    ) -> AsyncGenerator[str, str]:
        chunks = model.astream(
            [self.__system_message]
            + [
                {"role": message.role.value, "content": message.content}
                for message in messages
            ]
        )
        async for chunk in chunks:
            yield chunk.content
