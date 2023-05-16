import { OPENAI_API_KEY } from "@/config/openai";
import { SYSTEM_ROLE } from "./prompt-engineering";
import { GPTResponse } from "./types";

export const OpenAIService = {
  apiKey: OPENAI_API_KEY,
  async gptChatCompletion(content: string): Promise<GPTResponse> {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: SYSTEM_ROLE },
          {
            role: "assistant",
            content:
              "Hola! Conozco todos los contenidos del libro Clima de El Gato y La Caja, así que podemos conversar lo que quieras sobre el proyecto.",
          },
          { role: "user", content: `¿Cuánto emite la ganadería?` },
          {
            role: "assistant",
            content: [
              "{{answer}} Según el Inventario Nacional de Gases de Efecto Invernadero, la actividad ganadera es responsable del 21,6% de las emisiones totales de GEI en Argentina. Esto es más del doble del promedio global correspondiente a este sector. Los animales rumiantes, como las vacas y las cabras, liberan grandes cantidades de metano (CH4) durante el proceso de digestión, y la aplicación de fertilizantes en el suelo emite óxido nitroso (N2O), al igual que el estiércol de los animales. Además, la expansión de la producción ganadera y la conversión de ecosistemas naturales en campos de cultivos y pasturas también liberan GEI a la atmósfera {{/answer}}",
              "{{question}} ¿Cómo se comparan las emisiones de GEI de la ganadería con otras actividades en el sector alimentario? {{/question}}",
              "{{question}} ¿Cuál es el papel de la ganadería en la deforestación y el cambio de uso del suelo? {{/question}}",
              "{{question}} ¿Existen alternativas al consumo de carne y productos lácteos como forma de reducir las emisiones de GEI? {{/question}}",
              "{{question}} ¿Qué medidas y prácticas se pueden implementar en la actividad ganadera para reducir las emisiones de GEI? {{/question}}",
            ].join("\n"),
          },
          { role: "user", content: content },
        ],
      }),
    });

    return await response.json();
  },
};
