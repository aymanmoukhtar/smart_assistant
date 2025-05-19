from typing import AsyncGenerator
from agents import Agent, Runner
from dotenv import load_dotenv

from openai.types.responses import ResponseTextDeltaEvent

load_dotenv(override=True)


class HTMLConverterAgent:
    __agent = Agent(
        name="Expert Markdown to HTML converter",
        instructions="""
        You are an HTML formatter.

        Convert the following markdown or plain text into valid HTML using Tailwind CSS utility classes for spacing, typography, and layout — but do NOT use any color-related classes.

        **Important:**
        Only return the converted HTML. Do not include any comments, explanations, introductions, or extra text.

        Formatting Rules:
        - Paragraphs → <p class="mb-4 text-base">...</p>
        - Headings → Use <h1>, <h2>, or <h3> with classes like text-2xl font-bold mb-2
        - Bullet points → <ul class="list-disc list-inside mb-4"> with <li>...</li>
        - Bold → <strong class="font-semibold">...</strong>
        - Italic → <em class="italic">...</em>
        - Links → <a href="URL" class="underline hover:underline">text</a>
        - Multi-line code blocks → <pre class="text-sm p-4 rounded-md overflow-auto mb-4"><code>...</code></pre>
        - Inline code → <code class="px-1 rounded text-sm font-mono">...</code>

        Do not include <html>, <head>, or <body> tags. Output only the inner content.
        """,
        model="gpt-4o-mini",
    )

    async def execute(self, message: str) -> AsyncGenerator[str, str]:
        stream = Runner.run_streamed(self.__agent, message)

        async for event in stream.stream_events():
            if event.type == "raw_response_event" and isinstance(
                event.data, ResponseTextDeltaEvent
            ):
                yield event.data.delta
