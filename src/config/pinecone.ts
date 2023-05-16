if (!process.env.PINECONE_INDEX_NAME) {
  throw new Error("Missing Pinecone index name in .env file");
}

const PINECONE_ENVIRONMENT = process.env.PINECONE_ENVIRONMENT ?? "";
const PINECONE_API_KEY = process.env.PINECONE_API_KEY ?? "";
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME ?? "";

export { PINECONE_ENVIRONMENT, PINECONE_API_KEY, PINECONE_INDEX_NAME };
