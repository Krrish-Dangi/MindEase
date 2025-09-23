from datetime import datetime, timezone
from pymongo import MongoClient
import os

MONGO_URI = os.getenv("MONGO_URI", "<Mongo_Database_string>")
client = MongoClient(MONGO_URI)
db = client["mental_health_support"]
chats_collection = db["chats"]

def save_message(user_id: str, user_message: str, bot_response: str, mood: str):
    chats_collection.insert_one({
        "user_id": user_id,
        "user_message": user_message,
        "bot_response": bot_response,
        "mood": mood,
        "timestamp": datetime.now(timezone.utc)
    })
def get_user_messages(user_id: str, limit: int = 3):
    """Fetch last N messages for a userin chronogical order"""
    chats = (
        chats_collection.find({"user_id":user_id})
        .sort("_id",-1) # Sort by newest
        .limit(limit)
    )
    # Reversing so oldest come first
    return list(chats)[::-1]
