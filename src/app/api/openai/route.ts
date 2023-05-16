import { parseResponse } from "@/utils";
import { OpenAIService } from "@/utils/openai-client";
import { querySimilarity } from "@/utils/pinecone-client";
import { userTemplate } from "@/utils/prompt-engineering";
import { CompletionResponse } from "@/utils/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { prompt, history }: { prompt: string; history: string } =
    await request.json();

  const sources = await querySimilarity(prompt);

  const userMessageContent = userTemplate(
    history,
    prompt,
    sources.map((_) => _.source.pageContent).join("\n")
  );

  const response = await OpenAIService.gptChatCompletion(userMessageContent);

  const { answer, questions } = response.choices.map(({ message }) => {
    return parseResponse(message.content);
  })[0];

  return NextResponse.json({
    answer,
    questions,
    sources,
  } as CompletionResponse);
}
