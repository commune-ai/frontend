# app/views/description_view.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db import SessionLocal
from app.controllers.description_controller import (
    create_description,
    get_all_descriptions,
)
from pydantic import BaseModel
from typing import AsyncGenerator, List
from contextlib import asynccontextmanager

router = APIRouter()


class DescriptionRequest(BaseModel):
    name: str
    description: str


@asynccontextmanager
async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with SessionLocal() as session:
        try:
            yield session
        except Exception as e:
            await session.rollback()
            raise HTTPException(status_code=500, detail=str(e))
        finally:
            await session.close()


@router.post("/save-description/")
async def save_description(
    request: DescriptionRequest, session: AsyncSession = Depends(get_session)
):
    return await create_description(session, request.name, request.description)


@router.get("/all-descriptions/")
async def fetch_all_descriptions(
    session: AsyncSession = Depends(get_session),
) -> List[str]:
    descriptions = await get_all_descriptions(session)
    return {"descriptions": descriptions}
