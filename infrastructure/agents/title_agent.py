from agents import Agent, Runner
from dotenv import load_dotenv

load_dotenv(override=True)


class TitleGeneratorAgent:
    __agent = Agent(
        name="Title Generator",
        instructions="""
        You are a title generator, that is solely responsible for taking a user message and convert it into a title.
        This title is going to be used as the conversation title between the user and another LLM.
        Make sure its no more than 6 words, and not less than 3.
        When you get a message to generate a title for, respond back with the title, and only with the title, nothing else.
        """,
        model="gpt-4o-mini",
    )
    
    async def execute(self, message: str) -> str:
        result = await Runner.run(self.__agent, message)
        return result.final_output
