# MindEase (SIH 2025, PSID: 25092)

MindHaven — built around the MindEase application — is a mental-wellness platform designed to help users monitor, understand, and improve their psychological health through simple, human-centred digital tools. The project targets early identification and ongoing self-care: it gives users easy ways to record moods and symptoms, take validated screening questionnaires, access guided self-help content, and connect with professional support when needed. The core idea is to make mental health check-ins a regular, low-friction habit and to provide data-driven insights that empower both users and care providers.

## What problem it solves

Many people do not notice gradual changes in their mood or mental health until problems become severe. Access to timely, appropriate support is also inconsistent. MindHaven provides an accessible digital entry point: lightweight daily tracking and validated screening (e.g., short questionnaires), combined with session booking and communication flows, help identify issues early and make it easier to access help or self-management resources.

## Key features

* **Mood and symptom tracking:** Quick daily check-ins that build a short-term timeline of a user’s mood and stress levels.
* **Screening and assessments:** Support for standard short assessments to flag possible anxiety or depression (used as guided signals, not diagnoses).
* **Chat & support flows:** A conversational interface for guided self-help and for preparing users before counselor interactions.
* **Session booking:** Browse available counselors, choose mode (video/text/in-person), and schedule appointments.
* **User data store & history:** Secure storage of user entries and session history for trend analysis and continuity.
* **Admin/Counselor interface (planned):** Tools for counselors to view anonymized trends, manage bookings, and follow up.

## Architecture & technology (summary)

The project uses a modern web stack with a decoupled frontend and backend:

* **Frontend:** Single-page application (React + Vite) for a responsive, accessible user interface.
* **Backend:** Node.js server with REST APIs handling authentication, data storage, and business logic.
* **Database:** MongoDB for flexible document storage of user entries, sessions, and chat logs.
* **Deployment-ready:** Separate build/deploy flows for frontend and backend so the app can scale and integrate with third-party services (auth, video, notifications).

## Impact & goals

MindHaven aims to reduce barriers to mental-health care by encouraging regular self-monitoring and streamlining access to support. For SIH judges and future users, the project demonstrates a practical, deployable approach to mental wellness tools that can be adapted for colleges, workplaces, or community health programs.

Got it 👍 You want a **clear “how to run” guide** so anyone (judges, teammates, contributors) can quickly start your **MindHaven / MindEase** project. I’ll give you exact step-by-step instructions for both **frontend** and **backend**, with environment setup.

---

# 🚀 How to Run the Project

## 1. Clone the repo

```bash
git clone https://github.com/Krrish-Dangi/MindHaven.git
cd MindHaven/MindEase
```

---

## 2. Backend Setup (Node.js + MongoDB)

1. Go into the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Connect backend with mongoDB database:

```bash
create a .env file in the backend folder and copy paste this:

MONGO_URI=<Database string>
PORT=5000
```

4. Start the backend server:

```bash
npm start
```

---

## 3. Frontend Setup (React + Vite)

1. Open a new terminal and go into the frontend folder:

```bash
cd ../frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

---

## 4. AI (project-root):

1. Open a new terminal and go into the frontend folder:

```bash
cd ../project-root
```

2. Install dependencies:

```bash
pip install -r Requirements.txt
```

3. Start the development server:

```bash
python -m uvicorn main:app --reload --port 8000
```

---

# NOTE: Run these in three separate terminals.



