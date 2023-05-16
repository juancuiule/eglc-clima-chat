"use client";
import { Graph } from "@/components/Graph";
import { Interaction } from "@/components/Interaction";
import { useInteractionStore } from "@/hooks/useInteractionStore";
import { useToggle } from "@/hooks/useToggle";
import { useState } from "react";
import { ArrowRight, Maximize, X } from "react-feather";

const InteractionView = () => {
  const interactionStore = useInteractionStore();
  return <Interaction interaction={interactionStore.data} />;
};

const FirstQuestionView = () => {
  const { updateInteraction, ask } = useInteractionStore();

  const [question, setQuestion] = useState("");

  return (
    <div className="flex flex-col gap-4 border rounded px-4 py-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="question-input">Tu pregunta:</label>
        <textarea
          id="question-input"
          value={question}
          placeholder="Escribí tu pregunta inicial"
          className="border rounded text-sm px-2 inline-block w-full"
          onChange={(e) => {
            const value = e.target.value;
            setQuestion(value);
          }}
        />
      </div>
      <button
        className="group border rounded px-3 w-fit flex items-center gap-1 hover:border-blue-500 hover:bg-blue-100"
        style={{ transition: "width 0.2s" }}
        onClick={() => {
          updateInteraction("1", {
            question,
          });

          ask({
            id: "1",
            question,
            error: false,
            loading: false,
          });
        }}
      >
        Empezar <ArrowRight className="hidden group-hover:inline w-5 h-5" />
      </button>
    </div>
  );
};

export default function App() {
  const { data } = useInteractionStore();

  const [fullscreen, toggle] = useToggle(false);

  return (
    <div className="flex min-h-screen px-5 py-5 gap-4 flex-col xl:flex-row">
      <div className="container mx-auto max-w-3xl w-full flex flex-col gap-4 align-start">
        <details open>
          <summary className="text-2xl">Multi ChatGPT</summary>

          <p className="mt-4">
            {">"} Descubrí y explorá temas de tu interés mediante un chat como
            chat-gpt pero con múltiples ramificaciones.
          </p>
          <p className="mt-4">
            {">"} Empezá con una pregunta y el chat te va a responder ofreciendo
            3 o más preguntas relacionadas para seguir profundizando en el tema.
            Podés hacer click en cualquiera de las preguntas sugeridas para
            abrir nuevas ramas de conversación.
          </p>
          <p className="mt-4">
            {">"} Siempre vas a poder ver las ramas anteriores y todo el hilo de
            la conversación.
          </p>
        </details>
        {data.question !== "" ? <InteractionView /> : <FirstQuestionView />}
      </div>
      {data.question !== "" && (
        <div
          className={
            fullscreen
              ? "z-50 absolute w-screen h-full bg-white -l-5 top-0 left-0"
              : "w-full relative mx-auto max-w-3xl h-[600px] xl:h-auto rounded border-2"
          }
        >
          <button
            onClick={() => toggle()}
            className={"absolute z-50 right-2 top-2"}
          >
            {fullscreen ? <X size={20} /> : <Maximize size={20} />}
          </button>
          <Graph />
        </div>
      )}
    </div>
  );
}
