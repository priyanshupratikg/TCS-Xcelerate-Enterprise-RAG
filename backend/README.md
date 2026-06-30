# 📄 PDF RAG Chatbot using LangChain, ChromaDB & Mistral AI

A simple Retrieval-Augmented Generation (RAG) chatbot that answers questions from a PDF document using **LangChain**, **ChromaDB**, **Hugging Face Embeddings**, and **Mistral AI**.

---

## 🚀 Features

* Load any PDF document
* Split the document into manageable text chunks
* Generate vector embeddings using Hugging Face
* Store embeddings in a persistent Chroma vector database
* Retrieve the most relevant document chunks using MMR search
* Generate accurate answers using the Mistral LLM
* Respond only using the document context

---

## 🛠️ Tech Stack

* Python
* LangChain
* ChromaDB
* Hugging Face Embeddings
* Mistral AI
* python-dotenv

---

## 📁 Project Structure

```text
project/
│
├── create_database.py      # Creates the vector database from the PDF
├── main.py                 # RAG chatbot
├── chroma_db/              # Generated vector database
├── document loaders/
│   └── DeepLearning.pdf
├── .env                    # Stores API keys
├── requirements.txt
└── README.md
```

---

## ⚙️ How It Works

### Step 1: Create the Vector Database

`create_database.py` performs the following tasks:

* Loads the PDF document
* Splits the document into overlapping chunks
* Cleans the extracted text
* Generates embeddings using Hugging Face
* Stores all embeddings in ChromaDB

Run:

```bash
python create_database.py
```

After execution, a persistent `chroma_db` folder is created.

---

### Step 2: Start the Chatbot

`main.py` performs the following tasks:

* Loads the existing Chroma vector database
* Initializes the embedding model
* Creates an MMR retriever
* Retrieves the most relevant document chunks
* Sends the retrieved context and user question to the Mistral LLM
* Returns an answer based only on the document

Run:

```bash
python main.py
```

Example:

```text
You : What is Deep Learning?

AI : Deep Learning is a subset of machine learning that uses artificial neural networks with multiple layers to learn complex patterns from data.
```

Enter `0` to exit the chatbot.

---

## 🧠 RAG Workflow

```text
PDF
 │
 ▼
Load PDF
 │
 ▼
Split into Chunks
 │
 ▼
Generate Embeddings
 │
 ▼
Store in ChromaDB
 │
 ▼
User Question
 │
 ▼
Retrieve Relevant Chunks
 │
 ▼
Create Prompt
 │
 ▼
Mistral AI
 │
 ▼
Answer
```

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/pdf-rag-chatbot.git

cd pdf-rag-chatbot
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate the environment:

**Windows**

```bash
.venv\Scripts\activate
```

**macOS/Linux**

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root.

```env
MISTRAL_API_KEY=your_api_key_here
```

---

## 📚 Dependencies

* langchain
* langchain-community
* langchain-huggingface
* langchain-text-splitters
* langchain-mistralai
* chromadb
* sentence-transformers
* pypdf
* python-dotenv

---

## 🎯 Future Improvements

* FastAPI backend
* Streamlit or React frontend
* Support multiple PDF uploads
* Conversation memory
* Source citations with responses
* Docker deployment

---
