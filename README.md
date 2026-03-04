# VectorShift Pipeline Builder – Technical Assessment

A full-stack pipeline builder application built with **React** (frontend) and **FastAPI** (backend). Users can visually create node-based pipelines using a drag-and-drop interface powered by React Flow, and submit them to the backend for DAG validation.

---

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | React 18, React Flow, Zustand     |
| Backend  | Python, FastAPI, Pydantic         |
| Styling  | Vanilla CSS                       |

---

## Project Structure

```
Kiran_Annigeri_technical_assessment/
├── backend/
│   └── main.py              # FastAPI server with /pipelines/parse endpoint
├── frontend/
│   ├── public/               # Static assets
│   └── src/
│       ├── components/       # Reusable UI components (Toolbar, SubmitButton, etc.)
│       ├── hooks/            # Custom React hooks
│       ├── nodes/            # Custom node type definitions for React Flow
│       ├── store.js          # Zustand global state management
│       ├── App.js            # Main application entry
│       └── index.css         # Global styles
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 16 and **npm**
- **Python** ≥ 3.8

### Backend Setup

```bash
cd backend
pip install fastapi uvicorn pydantic
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The app will open at `http://localhost:3000` (or `3001` if port 3000 is in use).

---

## API Endpoints

| Method | Endpoint            | Description                                                      |
|--------|---------------------|------------------------------------------------------------------|
| GET    | `/`                 | Health check – returns `{"Ping": "Pong"}`                        |
| POST   | `/pipelines/parse`  | Accepts `{nodes, edges}` and returns node/edge count & DAG check |

### Example Response – `/pipelines/parse`

```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

---

## Features

- **Drag-and-drop pipeline builder** using React Flow
- **Multiple custom node types** with configurable inputs and outputs
- **Global state management** with Zustand
- **DAG validation** – backend checks whether the submitted pipeline forms a valid Directed Acyclic Graph
- **Responsive UI** with a clean, modern design

---

## Author

**Kiran Annigeri**
