import { findById, parseResponse, reconstructHistory } from "@/utils";
import { OpenAIService } from "@/utils/openai-client";
import { InteractionData, Source } from "@/utils/types";
import { produce } from "immer";
import { create } from "zustand";

export type State = {
  data: InteractionData;
  updateInteraction: (
    id: string,
    updatedData: Partial<InteractionData>
  ) => void;
  ask: (interaction: InteractionData) => Promise<void>;
};

const initialData = {
  id: "1",
  question: "",
  loading: false,
  error: false,
};

const sampleData = {
  id: "1",
  question: "¿Cuánto emite la ganadería?",
  loading: false,
  error: false,
  answer:
    "Según el Inventario Nacional de Gases de Efecto Invernadero, la actividad ganadera es responsable del 21,6% de las emisiones totales de GEI en Argentina. Esto es más del doble del promedio global correspondiente a este sector. Los animales rumiantes, como las vacas y las cabras, liberan grandes cantidades de metano (CH4) durante el proceso de digestión, y la aplicación de fertilizantes en el suelo emite óxido nitroso (N2O), al igual que el estiércol de los animales. Además, la expansión de la producción ganadera y la conversión de ecosistemas naturales en campos de cultivos y pasturas también liberan GEI a la atmósfera",
  following: [
    {
      id: "1.1",
      question:
        "¿Cómo se comparan las emisiones de GEI de la ganadería con otras actividades en el sector alimentario?",
      loading: false,
      error: false,
    },
    {
      id: "1.2",
      question:
        "¿Cuál es el papel de la ganadería en la deforestación y el cambio de uso del suelo?",
      loading: false,
      error: false,
    },
    {
      id: "1.3",
      question:
        "¿Existen alternativas al consumo de carne y productos lácteos como forma de reducir las emisiones de GEI?",
      loading: false,
      error: false,
    },
    {
      id: "1.4",
      question:
        "¿Qué medidas y prácticas se pueden implementar en la actividad ganadera para reducir las emisiones de GEI?",
      loading: false,
      error: false,
    },
  ],
  sources: [
    {
      source: {
        pageContent:
          "<strong><em>Alimentación.</em></strong> Necesitamos alimentar a tantas personas que es imposible que esto no genere cantidades importantes de GEI. Por más que toda la cadena de suministro esté impulsada por energía eléctrica proveniente de fuentes renovables, el crecimiento de las plantas y los animales que consumimos siempre va a tener emisiones asociadas. El total de GEI provenientes de la producción de alimentos fue de 18 Gt CO2-eq en 2019, es decir, el 34% (¡un tercio!) del total global. El principal GEI de este sector es el CH4 que generan las vacas, seguido de las emisiones de este mismo gas provenientes de los cultivos de arroz.",
        metadata: {
          source: "/content/drive/MyDrive/Textos Clima/1.1.txt",
        },
      },
      score: 0.86792779,
    },
    {
      source: {
        pageContent:
          "A diferencia de otros sectores, las emisiones de GEI asociadas a la producción y consumo de alimentos suelen ser mayores en los países en vías de desarrollo que en los países desarrollados. De hecho, este sector es especialmente importante para la realidad argentina. Según el Inventario Nacional de Gases de Efecto Invernadero, publicado en 2019 por la Secretaría de Ambiente y Desarrollo Sustentable de la Nación, la producción de energía es la fuente principal de GEI en nuestro país. Sin embargo, cuando se distribuye esa energía según los distintos subsectores que la utilizan (como la generación de electricidad, las distintas actividades industriales, o el transporte), la actividad ganadera pasa al primer lugar con el 21,6% de las emisiones totales de GEI. Esto es más del doble del promedio global correspondiente a este sector.",
        metadata: {
          source: "/content/drive/MyDrive/Textos Clima/1.1.txt",
        },
      },
      score: 0.86603272,
    },
    {
      source: {
        pageContent:
          "Es importante considerar que hay una importante variabilidad en la cantidad de GEI derivados de la producción de los distintos alimentos por múltiples factores, como el uso de fertilizantes y pesticidas o según si el ganado se cría de forma convencional o intensiva. De hecho, una oscura realidad nos indica que lo mejor para minimizar las emisiones de GEI asociadas a este consumo se da, lamentablemente, cuando más sufren los animales, es decir, cuando se los cría de manera más eficiente: la ganadería intensiva usa menos tierra, el alimento es abundante y los animales crecen más rápido dado que gastan menos energía en otras cosas, como en moverse. Por estas razones pueden encontrarse diversas estimaciones, según las condiciones en las cuales un determinado alimento es producido y los distintos acercamientos que se pueden haber utilizado para los cálculos de las emisiones asociadas. En cualquier caso, la producción de carne vacuna es el alimento que mayor cantidad de GEI genera, ya sea",
        metadata: {
          source: "/content/drive/MyDrive/Textos Clima/1.1.txt",
        },
      },
      score: 0.863454878,
    },
    {
      source: {
        pageContent:
          "acercamientos que se pueden haber utilizado para los cálculos de las emisiones asociadas. En cualquier caso, la producción de carne vacuna es el alimento que mayor cantidad de GEI genera, ya sea que lo consideremos por kilogramo, calorías o gramos de proteínas.",
        metadata: {
          source: "/content/drive/MyDrive/Textos Clima/1.1.txt",
        },
      },
      score: 0.862698615,
    },
    {
      source: {
        pageContent:
          'Como se mencionó en la primera parte del libro, producir la comida que usamos para alimentar al mundo emite a la atmósfera una gran cantidad de GEI. Si se contabilizan solo las emisiones del sector Agricultura, Silvicultura y Otros Usos del Suelo (AFOLU), se estima una emisión anual de 13 Gt CO2-eq por año, o sea, un 22% del total global. ¿Cómo podemos dimensionar esto? Digamos que es un 50% más de lo que emiten conjuntamente todos los aviones, camiones, autos y otros medios de transporte. Pero si consideramos todas las emisiones del sistema agroalimentario, tanto las que ocurren en el campo (AFOLU) como aquellas asociadas al transporte, procesamiento, almacenamiento, refrigeración y consumo de los alimentos, entonces ese valor asciende a 18 Gt CO2-eq por año, es decir, un tercio de las emisiones globales.[footnote content="De acuerdo con el último informe del IPCC (2022), las emisiones de GEI del sector AFOLU fueron 12,8 Gt CO2-eq, mientras que las correspondientes al sistema',
        metadata: {
          source: "/content/drive/MyDrive/Textos Clima/2.3.txt",
        },
      },
      score: 0.862186491,
    },
  ],
};

export const useInteractionStore = create<State>((set, get) => ({
  data: initialData,
  ask: async (interaction: InteractionData) => {
    if (interaction.answer) return;

    const history = reconstructHistory(get().data, interaction.id);
    get().updateInteraction(interaction.id, { loading: true });

    try {
      const sources = await fetch("/api/pinecone/similarity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: interaction.question,
        }),
      })
        .then((res) => res.json())
        .then(({ sources }: { sources: Source[] }) => sources);

      const response = await OpenAIService.gptChatCompletion(
        sources.map(({ source: { pageContent } }) => pageContent),
        interaction.question,
        history
      );

      const { answer, questions } = response.choices.map(({ message }) => {
        return parseResponse(message.content);
      })[0];

      // const { answer, questions }: CompletionResponse = await fetch(
      //   "/api/openai",
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       prompt: interaction.question,
      //       context,
      //       sources,
      //     }),
      //   }
      // ).then((res) => res.json());

      get().updateInteraction(interaction.id, {
        answer: answer,
        following: questions.map((question: string, i) => ({
          id: `${interaction.id}.${i + 1}`,
          question,
          loading: false,
          error: false,
        })),
        sources,
        loading: false,
        error: false,
      });
    } catch (error) {
      get().updateInteraction(interaction.id, {
        loading: false,
        error: true,
      });
    }
  },
  updateInteraction: (id, updatedData) =>
    set((state) =>
      produce(state, (draft) => {
        const interaction = findById(draft.data)(id);
        if (interaction) {
          Object.assign(interaction, updatedData);
        }
      })
    ),
}));
