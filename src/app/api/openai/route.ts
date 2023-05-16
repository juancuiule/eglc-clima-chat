import { parseResponse } from "@/utils";
import { OpenAIService } from "@/utils/openai-client";
import { userTemplate } from "@/utils/prompt-engineering";
import { CompletionResponse, Source } from "@/utils/types";
import { NextResponse } from "next/server";

type Body = { prompt: string; history: string; sources: Source[] };

export async function POST(request: Request) {
  const { prompt, history, sources }: Body = await request.json();

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