# main.py
# User sends a message

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.chatbot import get_gemma_response
from app.db import save_message
from app.sos import send_sos_alert  
from app.sentiment import analyze_sentiment
from app.music import get_music_from_text
from app import history

app = FastAPI(title="Digital Mental Health Support System")

# Enabling CORS so React frontend can connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    user_id: str
    message: str

@app.post("/chat/")
async def chat_endpoint(request: ChatRequest):
    try:
        # Step 1: Sentiment Analysis
        sentiment = analyze_sentiment(request.message)

        if sentiment["risk_flag"]:
            # SOS ALERT
            send_sos_alert(request.user_id, request.message)
            response = (
                "⚠️ I hear you’re going through something very difficult.\n"
                "You’re not alone. I recommend reaching out to a counselor or helpline immediately.\n"
                "I've sent an alert to ensure you get help.\n"
                "You are worth every second that time can spare. You are beautiful just like the apricity of the sun.\n"
                "I am here for you — pour your heart out.\n\n"
                "Oh little rose, I am your gardener. Don't wither away. Who will I water?"
            )
            music_link = None
        else:
            # Step 2: Get response from Gemma
            response = get_gemma_response(
                request.message, 
                user_id=request.user_id, 
                mood=sentiment.get("mood", "Relaxed")
            )

            # Step 3: Recommending Music
            music_data = get_music_from_text(request.message)
            music_link = music_data["playlist"]

            # Step 4: Save chat in DB
            save_message(
                user_id=request.user_id,
                user_message=request.message,
                bot_response=response,
                mood=music_data["mood"]
            )

        return {
            "user": request.message,
            "bot": response,
            "sentiment": sentiment,
            "music_recommendation": music_link,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Register history router for past chats
app.include_router(history.router, prefix="/chat", tags=["Chat History"])