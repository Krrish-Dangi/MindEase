from textblob import TextBlob

mood_to_music = {
    "Happy": "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC",
    "Sad": "https://open.spotify.com/playlist/1oJZ98sB3FbQAbrZkEbdtQ",
    "Stressed": "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ",
    "Relaxed": "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO"
}

def get_music_from_text(text: str):
    """
    Analyze text → detect mood → return mood & playlist.
    """
    analysis = TextBlob(text)
    polarity = analysis.sentiment.polarity

    if polarity > 0.3:
        mood = "Happy"
    elif polarity < -0.2:
        mood = "Depressed"
    elif 0.1 <= polarity <= 0.3:
        mood = "Relaxed"
    else:
        mood = "Stressed"

    return {
        "mood": mood,
        "playlist": mood_to_music.get(mood, None)
    }