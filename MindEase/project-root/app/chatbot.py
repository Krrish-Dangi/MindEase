# Chatbot.py
# Loading the model from groq

import os
from groq import Groq
from app.db import get_user_messages

client = Groq(api_key = "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")

def get_gemma_response(user_message : str, user_id: str, mood: str) -> str:
      # Fetch last 3 messages
      history = get_user_messages(user_id, limit=3) or []
      messages = [
            {"role": "system", "content": 
              f"""You are a supportive, empathetic digital mental health companion. 
              You are their very dear loving friend and therapist who listens to them not just an AI for them.
              The user is currently feeling {mood}. Play some songs if you can else recommend some based on their mood.
              Follow the same boundaries, goals, and tone as before."""}
      ]
      # Add conversation history
      for h in history:
        messages.append({"role": "user", "content": h["user_message"]})
        messages.append({"role": "assistant", "content": h["bot_response"]})
      
      messages.append({"role": "user", "content": user_message})
    

      chat_completion = client.chat.completions.create(
        model="gemma2-9b-it",
        messages=messages
    )
      return chat_completion.choices[0].message.content