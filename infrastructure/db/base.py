from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from uuid import uuid4

from asyncpg import Connection
from infrastructure.app_config import app_config


def _get_unique_id(self, prefix):
    global _uid
    _uid += 1
    return "__asyncpg_{}_{:x}__".format(prefix, _uid)


class CConnection(Connection):
    def _get_unique_id(self, prefix: str) -> str:
        return f"__asyncpg_{prefix}_{uuid4()}__"


engine = create_async_engine(
    app_config.DATABASE_URL,
    echo=True,
    future=True,
    connect_args={
        "connection_class": CConnection,
    },
)

AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

Base = declarative_base()
