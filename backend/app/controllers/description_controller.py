# app/controllers/description_controller.py
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.description_model import Description
from sqlalchemy.future import select
from typing import List
from app.models.data_model import Data


async def create_description(session: AsyncSession, name: str, description: str):
    new_description = Description(name=name, text=description)
    session.add(new_description)
    try:
        await session.commit()
        return {"message": "Description saved successfully"}
    except Exception as e:
        await session.rollback()
        raise HTTPException(status_code=500, detail=str(e))


async def get_all_descriptions(session: AsyncSession) -> List[str]:
    async with session() as async_session:
        query = await async_session.execute(select(Description.text))
        return [row[0] for row in query.fetchall()]


async def get_all_data(session: AsyncSession) -> List[Data]:
    async with session() as s:
        result = await s.execute(select(Data))
        return result.scalars().all()
