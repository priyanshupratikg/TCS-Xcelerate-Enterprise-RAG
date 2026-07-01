# 📚 TCS-Xcelerate-Enterprise-RAG

> An Enterprise Retrieval-Augmented Generation (RAG) application that enables users to upload PDF documents and interact with them through an AI-powered conversational interface using semantic search and Large Language Models (LLMs).

---

## 📖 Project Overview

TCS-Xcelerate-Enterprise-RAG is an intelligent document question-answering system developed as part of the **TCS Xcelerate Program**.

The application allows users to upload enterprise documents (PDFs), automatically indexes their contents using vector embeddings, and provides context-aware answers to natural language questions. Instead of relying solely on an LLM's internal knowledge, the system retrieves relevant information directly from uploaded documents, ensuring accurate and document-grounded responses while minimizing hallucinations.

---

## 🚀 Features

- 📄 Upload one or more PDF documents
- ✂️ Automatic document chunking
- 🧠 Semantic embedding generation
- 🗂️ Persistent ChromaDB vector storage
- 🔍 Intelligent semantic document retrieval (MMR)
- 🤖 AI-powered conversational question answering
- 💬 Modern chat interface
- 📊 Real-time file upload progress
- 🎨 Responsive React-based frontend
- ⚡ Fast API communication
- 🔐 Environment-based configuration

---

# 🏗️ System Architecture

```
                User
                  │
                  ▼
          React Frontend (Vite)
                  │
        HTTP REST API Requests
                  │
                  ▼
          Python FastAPI Backend
                  │
          LangChain RAG Pipeline
                  │
     ┌────────────┼────────────┐
     ▼            ▼            ▼
PDF Loader   Text Splitter  Embeddings
     │            │            │
     └────────────┼────────────┘
                  ▼
           Chroma Vector DB
                  │
                  ▼
          Semantic Retriever
                  │
                  ▼
         Mistral Large Language Model
                  │
                  ▼
             Generated Response
```

---

# ⚙️ Technology Stack

## Frontend

- React
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3
- Fetch API
- XMLHttpRequest
- React Hooks
- Responsive UI

---

## Backend

- Python
- FastAPI
- LangChain
- LangChain Community
- Hugging Face Embeddings
- ChromaDB
- Mistral AI
- python-dotenv

---

## AI & NLP

- Retrieval-Augmented Generation (RAG)
- Semantic Search
- Vector Embeddings
- Maximum Marginal Relevance (MMR)
- Prompt Engineering

---

## Development Tools

- Git
- GitHub
- Visual Studio Code
- Node.js
- npm

---

# 📂 Project Structure

```
TCS-Xcelerate-Enterprise-RAG/
│
├── backend/
│   ├── api/
│   ├── models/
│   ├── services/
│   ├── routes/
│   └── main.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   └── App.jsx
│   ├── public/
│   └── package.json
│
├── rag/
│   ├── create_database.py
│   ├── retriever.py
│   ├── prompt.py
│   └── llm.py
│
├── database/
│   └── chroma_db/
│
├── data/
│   └── uploaded_documents/
│
├── docs/
│
├── tests/
│
├── README.md
└── .gitignore
```

---

# 🔄 Workflow

### 1️⃣ Document Upload

- User uploads a PDF document.
- Frontend sends the file to the backend.

---

### 2️⃣ Document Processing

- PDF is loaded.
- Text is extracted.
- Content is split into overlapping chunks.

---

### 3️⃣ Embedding Generation

- Hugging Face embedding model converts each chunk into vector representations.

---

### 4️⃣ Vector Storage

- Embeddings and metadata are stored in ChromaDB.

---

### 5️⃣ User Query

- User asks a question through the chat interface.

---

### 6️⃣ Semantic Retrieval

- The query is embedded.
- ChromaDB retrieves the most relevant document chunks using MMR search.

---

### 7️⃣ Response Generation

- Retrieved context and user query are combined into a prompt.
- Mistral LLM generates an accurate, context-aware answer.

---

### 8️⃣ Response Display

- Backend returns the generated answer.
- React updates the chat interface in real time.

---

# 📷 Application Modules

## Frontend

- Sidebar
- File Upload Component
- Chat Interface
- API Service Layer
- Responsive Layout

---

## Backend

- Upload API
- Document Processing
- Embedding Generation
- Vector Store Management
- Chat API
- Retrieval Engine

---

# 📈 Key Technologies Explained

| Technology | Purpose |
|------------|---------|
| React | Interactive user interface |
| Vite | Frontend development & build tool |
| FastAPI | Backend REST API |
| LangChain | AI workflow orchestration |
| HuggingFace | Text embedding generation |
| ChromaDB | Vector database |
| Mistral AI | Large Language Model |
| Fetch API | Client-server communication |
| dotenv | Environment variable management |

---

# 💡 Advantages

- Fast semantic document search
- Context-aware AI responses
- Reduced hallucinations
- Modular architecture
- Easily scalable
- Responsive user interface
- Enterprise-ready RAG pipeline

---

# 🔮 Future Enhancements

- Multiple document collections
- OCR support for scanned PDFs
- User authentication
- Role-based access control
- Chat history
- Conversation memory
- Multi-language support
- Cloud deployment
- Citation-based responses
- Hybrid search (Keyword + Vector)

---

# 👥 Team Members

| Name | Responsibility |
|------|----------------|
| Priyanshu Pratik | Project Management, GitHub Repository, Integration & Documentation |
| Sudeshna Sahoo | Frontend Development (React + Vite) |
| Rituparna | Backend Development |
| Amrita | RAG Pipeline & AI Integration |
| Sandip | Database & Vector Store |

---

# 📄 License

This project has been developed for educational purposes under the **TCS Xcelerate Program**.

---

## ⭐ Acknowledgement

We sincerely thank **Tata Consultancy Services (TCS)** for providing the opportunity to work on an enterprise-level Retrieval-Augmented Generation (RAG) project through the TCS Xcelerate Program. This project has enhanced our practical understanding of modern AI technologies, full-stack development, and collaborative software engineering practices.
