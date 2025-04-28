import os

from dotenv import load_dotenv

load_dotenv(override=True)


class AppConfig:
    DATABASE_URL: str = os.environ.get("DATABASE_URL")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY")
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY")
