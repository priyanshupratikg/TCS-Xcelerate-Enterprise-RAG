
## Introduction

The README document provides a comprehensive guide for setting up and using the ChromaDB Vector Store module of the Enterprise RAG project. It serves as the primary documentation for developers, explaining the purpose of the module, its implementation, installation steps, project structure, and execution process.

## Purpose

The purpose of the Vector Store module is to create a semantic knowledge base from PDF documents. It processes document content by generating vector embeddings and storing them in a persistent ChromaDB database. These stored embeddings are later used for similarity search, enabling the Retrieval-Augmented Generation (RAG) system to retrieve relevant information efficiently.

## Technologies Used

* Python
* ChromaDB
* LangChain
* Hugging Face Embeddings
* Sentence Transformers
* PyPDF
* Recursive Character Text Splitter

## Project Structure

The project is organized into separate directories for data, vector database storage, and source code. PDF documents are stored in the `data` directory, while the generated vector database is stored in the `database/vectordb` directory. The implementation files, including the embedding model and vector store logic, are located in the `rag` folder.

## Implementation Workflow

The implementation follows these steps:

1. Load PDF documents from the `data` folder.
2. Extract text from the documents.
3. Split the extracted text into smaller chunks.
4. Generate embeddings for each text chunk using the Hugging Face embedding model.
5. Store the generated embeddings in the persistent ChromaDB vector database.
6. Accept a user query and generate its embedding.
7. Perform semantic similarity search to retrieve the most relevant document chunks.

## Installation

Before running the project, install all required dependencies:

* chromadb
* langchain
* langchain-community
* langchain-chroma
* langchain-text-splitters
* langchain-huggingface
* sentence-transformers
* pypdf

## Execution

Run the Vector Store module from the project root directory:

```bash
python -m rag.vectorstore
```

The application loads the PDF documents, creates document embeddings, stores them in ChromaDB, and performs similarity search for user queries.

## Features

* PDF document loading
* Automatic text chunking
* Hugging Face embedding generation
* Persistent ChromaDB storage
* Semantic similarity search
* Modular and scalable implementation
* Easy integration with the Enterprise RAG pipeline

## Expected Outcome

After successful execution, the system creates a persistent ChromaDB vector database containing embeddings generated from the PDF documents. Users can submit natural language queries, and the similarity search retrieves the most relevant document chunks, improving the accuracy and efficiency of the RAG system.

## Conclusion

The README documentation provides all necessary information required to understand, configure, execute, and maintain the ChromaDB Vector Store module. It enables developers to quickly set up the environment, understand the workflow, and integrate the module into the complete Enterprise RAG application.

