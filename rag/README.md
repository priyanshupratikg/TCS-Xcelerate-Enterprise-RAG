# ChromaDB Vector Store

## Overview

The Vector Store module is responsible for creating and managing the knowledge base of the Enterprise RAG (Retrieval-Augmented Generation) application. It converts the textual content extracted from PDF documents into vector embeddings and stores them in a persistent ChromaDB database. These embeddings allow the application to perform semantic similarity searches, enabling efficient retrieval of relevant information instead of relying on keyword-based matching.

This module serves as the data layer of the RAG pipeline by preparing documents for retrieval and making them available for downstream question-answering tasks.

---

# Objectives

The main objectives of this module are:

* Load document data from PDF files.
* Process and split the document into smaller chunks.
* Generate embeddings for each chunk using a Hugging Face embedding model.
* Store the generated embeddings in a persistent ChromaDB vector database.
* Retrieve relevant document chunks using similarity search.

---

# Technologies Used

* Python
* ChromaDB
* LangChain
* Hugging Face Embeddings
* Sentence Transformers
* PyPDF
* Recursive Character Text Splitter

---

# Project Structure

```text
TCS-Xcelerate-Enterprise-RAG/
│
├── data/
│   └── PDF documents
│
├── database/
│   └── vectordb/
│
├── rag/
│   ├── embeddings.py
│   ├── vectorstore.py
│   └── README.md
│
└── requirements.txt
```

---

# Prerequisites

Install all required dependencies before running the project.

```bash
pip install chromadb
pip install langchain
pip install langchain-community
pip install langchain-chroma
pip install langchain-text-splitters
pip install langchain-huggingface
pip install sentence-transformers
pip install pypdf
```

---

# Module Description

## 1. Document Loading

The application reads PDF documents placed inside the **data** directory using the LangChain PDF loader. Each page of the document is extracted and prepared for further processing.

---

## 2. Text Chunking

Since embedding models perform better on smaller pieces of text, the extracted document is divided into overlapping chunks using the Recursive Character Text Splitter.

Typical configuration:

* Chunk Size: 500 characters
* Chunk Overlap: 100 characters

This preserves context between chunks while improving retrieval quality.

---

## 3. Embedding Generation

Each text chunk is converted into a high-dimensional vector using the Hugging Face embedding model:

```
sentence-transformers/all-MiniLM-L6-v2
```

These embeddings capture the semantic meaning of the text, enabling similarity-based retrieval instead of exact keyword matching.

---

## 4. Vector Database Creation

The generated embeddings are stored in a persistent ChromaDB vector database.

Storage location:

```text
database/
└── vectordb/
```

Persistence ensures that embeddings remain available across multiple executions without regenerating them every time.

---

## 5. Similarity Search

The vector database supports semantic similarity search.

When a user enters a query:

1. The query is converted into an embedding.
2. ChromaDB compares it with stored document embeddings.
3. The most relevant document chunks are retrieved.
4. These chunks can then be used by an LLM to generate accurate responses.

---

# Workflow

```
PDF Documents
      │
      ▼
Document Loader
      │
      ▼
Text Splitter
      │
      ▼
Embedding Generation
      │
      ▼
ChromaDB Vector Store
      │
      ▼
Similarity Search
      │
      ▼
Relevant Document Chunks
```

---

# Running the Module

From the project root directory, execute:

```bash
python -m rag.vectorstore
```

---

# Expected Output

After successful execution:

* PDF documents are loaded successfully.
* Document content is split into smaller chunks.
* Embeddings are generated for every chunk.
* ChromaDB creates a persistent vector database.
* Vector embeddings are stored in `database/vectordb`.
* Similarity search returns the most relevant document chunks based on user queries.

---

# Key Features

* Persistent ChromaDB vector database
* PDF document ingestion
* Automatic text chunking
* Hugging Face embedding generation
* Semantic similarity search
* Modular implementation for easy integration with Enterprise RAG
* Scalable design supporting multiple PDF documents

---

# Future Enhancements

* Support for multiple document formats (DOCX, TXT, HTML)
* Automatic document indexing
* Metadata-based filtering
* Batch document processing
* Integration with the RAG backend API
* Support for incremental updates without rebuilding the entire vector database

