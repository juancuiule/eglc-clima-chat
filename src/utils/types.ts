export type InteractionData = {
  id: string;
  question: string;
  answer?: string;
  sources?: Source[];
  following?: InteractionData[];
  loading: boolean;
  error: boolean;
};

export type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type Choice = {
  index: number;
  message: Message;
  finish_reason: string;
};

export type GPTResponse = {
  id: string;
  object: string;
  created: number;
  choices: Choice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

export type CompletionResponse = {
  answer: string;
  questions: string[];
  sources: Source[];
};

export type Source = {
  source: SimilaritySource;
  score: number;
};

export type SimilaritySource = {
  pageContent: string;
  metadata: { source: string };
};