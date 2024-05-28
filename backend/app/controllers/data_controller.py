from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.data_model import Data


async def save_data_to_db(session: AsyncSession, moduleName: str, imageUrl: str):
    new_data = Data(moduleName=moduleName, imageUrl=imageUrl)
    session.add(new_data)
    try:
        await session.commit()
        return {"message": "Data saved successfully"}
    except Exception as e:
        await session.rollback()
        raise HTTPException(status_code=500, detail=str(e))
