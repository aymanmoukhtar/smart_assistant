import os

from dotenv import load_dotenv
from langchain.chat_models import init_chat_model
from langchain_core.messages import HumanMessage, SystemMessage

load_dotenv()

model = init_chat_model("gpt-4o-mini", model_provider="openai")


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

    async def send_message(self, prompt: str) -> str:
        return model.invoke([self.__system_message, HumanMessage(prompt)]).content
