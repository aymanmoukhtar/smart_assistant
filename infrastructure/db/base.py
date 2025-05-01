from uuid import uuid4

from asyncpg import Connection
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from infrastructure.app_config import AppConfig


class CConnection(Connection):
    def _get_unique_id(self, prefix: str) -> str:
        return f"__asyncpg_{prefix}_{uuid4()}__"


engine = create_async_engine(
    AppConfig.DATABASE_URL,
    echo=False,
    future=True,
    connect_args={
        "statement_cache_size": 0,
        "connection_class": CConnection,
    },
    pool_pre_ping=True,
)

AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

Base = declarative_base()
