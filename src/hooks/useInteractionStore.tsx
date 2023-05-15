import { produce } from "immer";
import { useCallback } from "react";
import { create } from "zustand";
import { findById, reconstructHistory, sendPrompt } from "@/utils";
import { InteractionData } from "@/utils/types";

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
    "Según el Inventario Nacional de Gases de Efecto Invernadero de Argentina (2019), la ganadería es responsable del 21,6% de las emisiones totales de gases de efecto invernadero del país. Dentro de este sector, el principal gas de efecto invernadero es el CH4 que generan las vacas.",
  following: [
    {
      id: "1.1",
      question:
        "¿Qué otros sectores económicos tienen emisiones significativas de gases de efecto invernadero?",
      loading: false,
      error: false,
    },
    {
      id: "1.2",
      question:
        "¿Por qué la emisión de gases de efecto invernadero asociada a la alimentación suele ser mayor en países en vías de desarrollo que en países desarrollados?",
      loading: false,
      error: false,
    },
    {
      id: "1.3",
      question:
        "¿Cómo pueden reducirse las emisiones de gases de efecto invernadero asociadas a la producción de alimentos?",
      loading: false,
      error: false,
    },
    {
      id: "1.4",
      question:
        "¿Cómo se relaciona el trabajo de Ezequiel Arrieta con esto último?",
      loading: false,
      error: false,
      answer:
        "En el libro, Ezequiel Arrieta se encarga en el capítulo 2.3 de los desafíos asociados a la producción y el consumo de alimentos, responsables del 22% de las emisiones (o del 34%, si se consideran los aportes indirectos de otros sectores). Ahí se explora cómo algunos ajustes en nuestra dieta significarían una importante disminución de las emisiones globales de GEI, al tiempo que pueden mejorar nuestra salud, reducir el sufrimiento animal y recuperar valiosos ecosistemas.",
      following: [
        {
          id: "1.4.1",
          question:
            "¿Cómo puede la dieta afectar las emisiones globales de gases de efecto invernadero?",
          loading: false,
          error: false,
        },
        {
          id: "1.4.2",
          question:
            "¿Cuáles son algunas alternativas al consumo de alimentos derivados de la ganadería que se proponen en el capítulo?",
          loading: false,
          error: false,
        },
        {
          id: "1.4.3",
          question:
            "¿Qué otras soluciones se proponen dentro del libro para abordar los desafíos del cambio climático?",
          loading: true,
          error: false,
        },
        {
          id: "1.4.4",
          question:
            "¿Cómo pueden las comunidades organizarse para luchar contra el cambio climático en su área local?",
          loading: false,
          error: false,
        },
      ],
    },
  ],
};

export const useInteractionStore = create<State>((set, get) => ({
  data: initialData,
  ask: async (interaction: InteractionData) => {
    if (interaction.answer) return;

    const context = reconstructHistory(get().data, interaction.id);
    get().updateInteraction(interaction.id, { loading: true });

    await sendPrompt(interaction.question, context)
      .then((data) => {
        if (data.length > 0) {
          if (
            data[0].answer &&
            data[0].questions &&
            data[0].questions.length > 0
          ) {
            get().updateInteraction(interaction.id, {
              answer: data[0].answer,
              following: data[0].questions.map((question: string, i) => ({
                id: `${interaction.id}.${i + 1}`,
                question,
                loading: false,
                error: false,
              })),
              loading: false,
              error: false,
            });
          }
        }
      })
      .catch((e) => {
        get().updateInteraction(interaction.id, {
          loading: false,
          error: true,
        });
      });
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