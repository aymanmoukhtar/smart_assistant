from typing import AsyncGenerator
from infrastructure.db.base import AsyncSessionLocal, Base, engine
from sqlalchemy.ext.asyncio import AsyncSession

import infrastructure.db.entities

async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    await create_tables()
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()