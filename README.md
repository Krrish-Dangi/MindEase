### 1. Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/) (v18 or above recommended)
* npm (comes with Node.js) or yarn

To check:

```bash
node -v
npm -v
```

---

### 2. Clone or Extract

* If using GitHub:

  ```bash
  git clone <repo-url>
  cd mindhaven-frontend
  ```
* If using a ZIP:

  * Extract the folder
  * Open it in **VS Code** (or any editor)

---

### 3. Install Dependencies

Since `node_modules` is not included, install everything fresh:

```bash
npm install
```

---

### 4. Run the Development Server

Start the app:

```bash
npm run dev
```

This will start a local server (default: [http://localhost:5173](http://localhost:5173)).

---

### 5. Build for Production

To create an optimized build:

```bash
npm run build
```

Output will be in the **`dist/`** folder.

---

### 6. Preview Production Build (optional)

```bash
npm run preview
```

---

## 📂 Project Structure

```
mindhaven-frontend/
├── public/          # Static assets
├── src/             # React components, pages, styles
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
├── package.json     # Dependencies & scripts
├── vite.config.js   # Vite configuration
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 🛠️ Tech Stack

* **React (Vite)** – UI Framework
* **Tailwind CSS** – Styling
* **PostCSS + Autoprefixer** – CSS processing

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch (`feature/your-feature`)
3. Commit your changes
4. Push the branch & open a Pull Request

---
