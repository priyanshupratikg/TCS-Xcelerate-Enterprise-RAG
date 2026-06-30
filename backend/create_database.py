from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
# Load PDF
loader = PyPDFLoader("document loaders/DeepLearning.pdf")
docs = loader.load()

# Split into chunks
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)

chunks = splitter.split_documents(docs)

# Optional: Clean text
for doc in chunks:
    doc.page_content = (
        doc.page_content
        .encode("utf-8", "ignore")
        .decode("utf-8")
    )

# Create embedding model
embedding_model = HuggingFaceEmbeddings()

# Create vector database
vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embedding_model,
    persist_directory="chroma_db"
)

print("✅ Database created successfully!")