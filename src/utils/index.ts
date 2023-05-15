import { OpenAIService } from "./openai";
import { InteractionData } from "./types";

export const findInteractionListById =
  (data: InteractionData) =>
  (id: string): InteractionData[] | undefined => {
    let result: InteractionData[] = []; // Initialize the result as an empty array

    const findNestedById = (id: string, nestedData: InteractionData) => {
      const isInteractionOrFather = id.startsWith(nestedData.id);
      if (isInteractionOrFather) {
        result.push(nestedData); // Add the nestedData to the result array
        if (nestedData.following) {
          nestedData.following.forEach((subInteraction) => {
            findNestedById(id, subInteraction); // Recursively call the function
          });
        }
      }
    };

    findNestedById(id, data); // Call the recursive function

    return result.length ? result : undefined; // Return the result or undefined if no interactions were found
  };

export const findById =
  (data: InteractionData) =>
  (id: string): InteractionData | undefined => {
    let result: InteractionData | undefined; // Declare a variable outside the recursive function

    const findNestedById = (id: string, nestedData: InteractionData) => {
      const isInteractionOrFather = id.startsWith(nestedData.id);
      if (isInteractionOrFather) {
        if (id === nestedData.id) {
          result = nestedData; // Assign the result to the outer scope variable
        }
        if (nestedData.following) {
          nestedData.following.forEach((subInteraction) => {
            findNestedById(id, subInteraction); // Recursively call the function
          });
        }
      }
    };

    findNestedById(id, data); // Call the recursive function

    return result; // Return the result from the outer scope
  };

export const reconstructHistory = (
  mainInteracion: InteractionData,
  id: string
) => {
  const history = findInteractionListById(mainInteracion)(id)?.slice(0, -1);
  if (history !== undefined) {
    return history
      .map((interaction) => {
        return `Q: ${interaction.question}${
          interaction.answer ? `\nA: ${interaction.answer}` : ""
        }`;
      })
      .join("\n");
  }
  return "";
};

export function parseResponse(response: string): {
  answer: string;
  questions: string[];
} {
  const parsedResponse: { answer: string; questions: string[] } = {
    answer: "",
    questions: [],
  };

  const answerRegex = /{{answer}}\n?(.*?)\n?{{\/answer}}/;
  const questionRegex = /{{question}}\n?(.*?)\n?{{\/question}}/g;

  const answerMatch = response.match(answerRegex);
  const questionMatches = response.match(questionRegex);

  if (answerMatch) {
    parsedResponse.answer = answerMatch[1].trim();
  }

  if (questionMatches) {
    parsedResponse.questions = questionMatches.map((match) => {
      const questionMatch = match.match(
        /{{question}}\n?(.*?)\n?{{\/question}}/
      );

      if (questionMatch) {
        return questionMatch[1].trim();
      }

      return "";
    });
  }

  return parsedResponse;
}

export const sendPrompt = async (prompt: string, context: string) => {
  try {
    const response = await OpenAIService.getGPTResponse(prompt, context);

    const res = response.choices.map(({ message }) => {
      return parseResponse(message.content);
    });

    return res;
  } catch (error) {
    throw error;
  }
};
