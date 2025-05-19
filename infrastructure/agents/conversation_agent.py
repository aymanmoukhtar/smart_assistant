from typing import AsyncGenerator
from agents import Agent, Runner
from dotenv import load_dotenv

from domain.models.chat_message import ChatMessage
from openai.types.responses import ResponseTextDeltaEvent

load_dotenv(override=True)


class ConversationAgent:
    __agent = Agent(
        name="AI Assisstant",
        instructions="""
        You are a highly intelligent and professional AI assistant.
        Your primary goal is to help users by answering their questions accurately.

        If you do not know an answer, or if the information is not available in the context, politely admit it rather than guessing.

        Respond clearly, concisely, and in a friendly tone.
        Where appropriate, suggest follow-up actions or questions the user might find helpful.

        Always prioritize factual correctness.

        Use simple, professional language.

        Stay on-topic and avoid irrelevant information.

        If document context is provided, cite it naturally (no need for explicit "source 1" unless asked).

        Remain calm, helpful, and attentive to user needs at all times. 
        """,
        model="gpt-4o-mini",
    )

    async def execute(self, messages: list[ChatMessage]) -> AsyncGenerator[str, str]:
        stream = Runner.run_streamed(
            self.__agent,
            [
                {"role": message.role.value, "content": message.content}
                for message in messages
            ],
        )

        async for event in stream.stream_events():
            if event.type == "raw_response_event" and isinstance(
                event.data, ResponseTextDeltaEvent
            ):
                yield event.data.delta
