import { OPENAI_API_KEY } from "@/config/openai";
import {
  PINECONE_API_KEY,
  PINECONE_ENVIRONMENT,
  PINECONE_INDEX_NAME,
} from "@/config/pinecone";
import { PineconeClient } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { SimilaritySource } from "./types";

export async function initPinecone() {
  const pinecone = new PineconeClient();
  await pinecone.init({
    environment: PINECONE_ENVIRONMENT,
    apiKey: PINECONE_API_KEY,
  });
  return pinecone;
}

export async function querySimilarity(query: string) {
  const pinecone = await initPinecone();

  const pineconeIndex = pinecone.Index(PINECONE_INDEX_NAME);
  const embeddings = new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY });

  const store = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
  });

  return await store.similaritySearchWithScore(query, 5).then((sources) => {
    return sources.map(([source, score]) => {
      return { source: source as SimilaritySource, score };
    });
  });
}
