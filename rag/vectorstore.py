
from pathlib import Path

from langchain_chroma import Chroma

from rag.embeddings import get_embeddings

# Location where ChromaDB will store vectors
VECTOR_DB_PATH = Path("database/chroma_db")


class VectorStore:
    def __init__(self):
        self.embedding_model = get_embeddings()

    def create(self, documents):
        """
        Create a new Chroma vector database.
        """

        db = Chroma.from_documents(
            documents=documents,
            embedding=self.embedding_model,
            persist_directory=str(VECTOR_DB_PATH),
        )

        print("Vector database created successfully.")

        return db

    def load(self):
        """
        Load an existing Chroma database.
        """

        if not VECTOR_DB_PATH.exists():
            raise FileNotFoundError(
                "Vector database not found. Run document ingestion first."
            )

        return Chroma(
            persist_directory=str(VECTOR_DB_PATH),
            embedding_function=self.embedding_model,
        )

    def get_retriever(self, k=5):
        """
        Return a retriever for Retrieval-Augmented Generation.
        """

        db = self.load()

        return db.as_retriever(
            search_type="similarity",
            search_kwargs={"k": k},
        )

    def similarity_search(self, query, k=5):
        """
        Retrieve the most similar chunks.
        """

        db = self.load()

        return db.similarity_search(
            query=query,
            k=k,
        )