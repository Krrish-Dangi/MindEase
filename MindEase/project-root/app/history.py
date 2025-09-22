from fastapi import APIRouter, HTTPException
from app.db import get_user_messages

router = APIRouter()

@router.get("/history/{user_id}")
def get_chat_history(user_id: str, limit: int = 20):
    """
    Fetch last `limit` messages for a given user.
    """
    history = get_user_messages(user_id, limit = limit)
    if not history:
        raise HTTPException(status_code=404, detail = "No user history found! Lets begin!!")
    return {"history": history}