import { similaritySearch } from "@/utils/langchain";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { prompt }: { prompt: string } = await request.json();
  const sources = await similaritySearch(prompt);
  return NextResponse.json({ sources });
}
