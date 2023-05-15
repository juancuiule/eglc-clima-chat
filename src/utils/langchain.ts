import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeClient } from "@pinecone-database/pinecone";

// get environment from .env file
const environment = process.env.PINECONE_ENVIRONMENT!;
const apiKey = process.env.PINECONE_API_KEY!;
const indexName = process.env.PINECONE_INDEX_NAME!;
const openAIApiKey = process.env.OPENAI_API_KEY!;

export async function similaritySearch(question: string) {
  const pinecone = new PineconeClient();
  await pinecone.init({
    environment,
    apiKey,
  });

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey,
  });
  const index = pinecone.Index(indexName);

  const store = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: index,
  });
  return await store.similaritySearch(question);
}
