from typing import AsyncGenerator

from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain.chat_models import init_chat_model
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

from domain.models.chat_message import ChatMessage
from infrastructure.app_config import AppConfig

llm = init_chat_model(
    "gpt-4o-mini", model_provider="openai", api_key=AppConfig.OPENAI_API_KEY
)

system_message = """
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

chat_agent = create_tool_calling_agent(
    llm=llm,
    tools=[],
    prompt=ChatPromptTemplate.from_messages(
        [
            {"role": "system", "content": system_message},
            MessagesPlaceholder("chat_history"),
            {"role": "human", "content": "{input}"},
            ("placeholder", "{agent_scratchpad}"),
        ]
    ),
)

agent_executor = AgentExecutor(agent=chat_agent, tools=[], verbose=True)


class ChatGateway:

    async def generate_prompt_title(self, message: str) -> str:
        response = "some_title"

        return response

    async def send_message(self, messages: list[ChatMessage]) -> str:
        response = await chat_agent.ainvoke(
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
        chunks = agent_executor.astream_events(
            {
                "input": messages[-1].content,
                "chat_history": [
                    {"role": message.role.value, "content": message.content}
                    for message in messages[:-1]
                ],
            }
        )

        async for chunk in chunks:
            if chunk["event"] != "on_chat_model_stream":
                continue

            yield chunk["data"]["chunk"].content
