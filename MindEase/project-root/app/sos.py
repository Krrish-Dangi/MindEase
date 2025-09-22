# sos.py
from app.db import db

alerts_collection = db["alerts"]

def send_sos_alert(user_id: str, message: str):
  # Saving the alerts in the DB
  alerts_collection.insert_one({
      "user_id":user_id,
      "message": message,
      "status": "ALERT_TRIGGERED"
  })

  # PLACEHOLDER: IN FUTURE FOR EITHER TWILIO/EMAIL/FIREBASE
  print("SOS Alert for {user_id}: {message}")