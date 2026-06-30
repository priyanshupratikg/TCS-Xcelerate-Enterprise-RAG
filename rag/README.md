# RAG (Retrieval-Augmented Generation) Module

## Overview

The **RAG (Retrieval-Augmented Generation)** module is the core component of the Enterprise RAG system. It is responsible for processing PDF documents, preparing them for semantic retrieval, generating vector embeddings, storing them in a vector database, and retrieving the most relevant information for user queries.

The module follows a sequential pipeline where document text is extracted, divided into manageable chunks, converted into embeddings, and stored in ChromaDB. During retrieval, user queries are embedded and compared with the stored document embeddings to return the most relevant document chunks.

---

# Objectives

The RAG module is designed to:

* Extract text from PDF documents.
* Split extracted text into smaller chunks.
* Generate embeddings using Sentence Transformers.
* Store embeddings in ChromaDB.
* Perform semantic similarity search.
* Provide relevant document context for downstream Large Language Models (LLMs).

---

# Folder Structure

```text
rag/
├── pdf_loader.py
├── chunker.py
├── embedder.py
├── embeddings.py
├── vectorstore.py
└── README.md
```

---

# Module Description

## 1. pdf_loader.py

This module is responsible for loading PDF documents and extracting text using **PyMuPDF**.

Responsibilities:

* Read PDF documents from the `data` directory.
* Extract text from every page.
* Return the extracted content for further processing.

---

## 2. chunker.py

This module divides the extracted document into smaller overlapping chunks using the **LangChain Recursive Character Text Splitter**.

Responsibilities:

* Split large documents into smaller chunks.
* Maintain context using chunk overlap.
* Prepare chunks for embedding generation.

---

## 3. embedder.py

This module generates embeddings for each text chunk using **Sentence Transformers**.

Responsibilities:

* Load the embedding model.
* Convert text chunks into vector embeddings.
* Generate embeddings for user queries.

---

## 4. embeddings.py

This module initializes and manages the Hugging Face embedding model used throughout the application.

Responsibilities:

* Load the embedding model.
* Provide reusable embedding functions.
* Support document and query embedding generation.

---

## 5. vectorstore.py

This module creates and manages the ChromaDB vector database.

Responsibilities:

* Receive processed document chunks.
* Store embeddings in ChromaDB.
* Perform semantic similarity search.
* Return the most relevant document chunks.

---

# Workflow

```
PDF Documents
       │
       ▼
pdf_loader.py
       │
       ▼
Text Extraction
       │
       ▼
chunker.py
       │
       ▼
Text Chunks
       │
       ▼
embedder.py
       │
       ▼
Vector Embeddings
       │
       ▼
vectorstore.py
       │
       ▼
ChromaDB
       │
       ▼
Similarity Search
       │
       ▼
Relevant Document Chunks
```

---

# Technologies Used

* Python
* PyMuPDF
* LangChain
* LangChain Text Splitters
* Sentence Transformers
* Hugging Face Embeddings
* ChromaDB

---

# Installation

Install the required dependencies before running the project:

```bash
pip install pymupdf
pip install langchain
pip install langchain-community
pip install langchain-text-splitters
pip install langchain-huggingface
pip install sentence-transformers
pip install langchain-chroma
pip install chromadb
pip install pypdf
```

---

# Running the Module

Execute the vector store module from the project root directory:

```bash
python -m rag.vectorstore
```

---

# Features

* PDF text extraction
* Automatic document chunking
* Embedding generation using Sentence Transformers
* Persistent ChromaDB vector database
* Semantic similarity search
* Modular pipeline design
* Easy integration with backend APIs and LLMs

---

# Expected Output

After successful execution:

* PDF documents are processed successfully.
* Text is extracted from each document.
* Documents are divided into meaningful chunks.
* Embeddings are generated for every chunk.
* ChromaDB stores the embeddings persistently.
* User queries retrieve the most relevant document chunks using semantic similarity search.

---


# Future Enhancements

* Support multiple document formats (DOCX, TXT, HTML).
* Hybrid search (keyword + semantic search).
* Metadata-based filtering.
* Incremental document indexing.
* Support for multiple vector collections.
* Integration with advanced Large Language Models (LLMs).

---

# Conclusion

The RAG module forms the foundation of the Enterprise RAG system by transforming unstructured PDF documents into searchable vector representations. Through document extraction, intelligent chunking, embedding generation, and semantic retrieval, the module enables fast, context-aware information retrieval and provides high-quality context for downstream AI applications.

