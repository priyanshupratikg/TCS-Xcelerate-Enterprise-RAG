from langchain_chroma import Chroma
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

from rag.embeddings import get_embeddings


PDF_PATH = "data/Admission.pdf"
PERSIST_DIRECTORY = "database/vectordb"


def create_vector_db():
    print("Loading PDF...")

    loader = PyPDFLoader(PDF_PATH)
    documents = loader.load()

    print(f"Loaded {len(documents)} page(s).")

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100
    )

    chunks = text_splitter.split_documents(documents)

    print(f"Created {len(chunks)} chunks.")

    embeddings = get_embeddings()

    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=PERSIST_DIRECTORY
    )

    print("Vector database created successfully!")

    return vectorstore


def test_similarity_search(vectorstore):
    print("\nTesting similarity search...\n")

    query = input("Enter your query: ")

    results = vectorstore.similarity_search(
        query,
        k=3
    )

    print("\nTop Results:\n")

    for i, doc in enumerate(results, start=1):
        print(f"Result {i}")
        print("-" * 50)
        print(doc.page_content)
        print()


if __name__ == "__main__":
    vector_db = create_vector_db()
    test_similarity_search(vector_db)


# TO LOAD MUTIPLE PDFs

# from pathlib import Path
# from langchain_community.document_loaders import PyPDFLoader

# documents = []

# pdf_folder = Path("data")

# for pdf_file in pdf_folder.glob("*.pdf"):
#     print(f"Loading {pdf_file.name}...")
#     loader = PyPDFLoader(str(pdf_file))
#     documents.extend(loader.load())

# print(f"Loaded {len(documents)} pages from all PDFs.")