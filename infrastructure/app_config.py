import os

from dotenv import load_dotenv

load_dotenv()


class AppConfig:
    DATABASE_URL: str = os.environ.get("DATABASE_URL")


app_config = AppConfig()
