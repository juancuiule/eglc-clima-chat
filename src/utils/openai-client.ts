import { OPENAI_API_KEY } from "@/config/openai";
import {
  INTERACTIONS,
  INTERACTION_TEMPLATES,
  PROMPTS_V2,
} from "./prompt-engineering";
import { GPTResponse } from "./types";

export const OpenAIService = {
  apiKey: OPENAI_API_KEY,
  async gptChatCompletion(
    sources: string[],
    question: string,
    history: string
  ): Promise<GPTResponse> {
    const {
      system_role,
      format_guidelines,
      question_answering,
      entity_detection,
    } = PROMPTS_V2;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `${system_role} ${format_guidelines} ${question_answering} ${entity_detection}`,
          },
          ...INTERACTIONS.catastrofe,
          ...INTERACTIONS.ganaderia,
          {
            role: "user",
            content: INTERACTION_TEMPLATES.question_answer({
              sources,
              question,
              history,
            }),
          },
        ],
      }),
    });

    return await response.json();
  },
};
