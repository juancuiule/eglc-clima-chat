import { querySimilarity } from "@/utils/pinecone-client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { query }: { query: string } = await request.json();
  const sources = await querySimilarity(query);
  return NextResponse.json({ sources });
}
