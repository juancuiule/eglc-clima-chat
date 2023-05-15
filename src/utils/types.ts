export type InteractionData = {
  id: string;
  question: string;
  answer?: string;
  following?: InteractionData[];
  loading: boolean;
  error: boolean;
};