const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? "";

if (OPENAI_API_KEY === "") {
  throw new Error("Missing OpenAI API key in .env file");
}

export { OPENAI_API_KEY };
