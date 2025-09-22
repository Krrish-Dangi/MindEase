from textblob import TextBlob

def analyze_sentiment(message: str) -> str:
    analysis = TextBlob(message)
    polarity = analysis.sentiment.polarity  # -ve to +ve
    subjectivity = analysis.sentiment.subjectivity  # objective to subjective

    risk_flag = False
    if polarity <= -0.5:  # a very strong tone
        risk_flag = True

    return {
        "polarity": polarity,
        "subjectivity": subjectivity,
        "risk_flag": risk_flag
    }
