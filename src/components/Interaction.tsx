import { useInteractionStore } from "@/hooks/useInteractionStore";
import { InteractionData } from "@/utils/types";
import { useState } from "react";

import { PlusCircle, RefreshCw } from "react-feather";

export const Interaction = (props: { interaction: InteractionData }) => {
  const { interaction } = props;

  const { updateInteraction, ask } = useInteractionStore();

  const [newQuestion, setNewQuestion] = useState("");
  const [showNew, setShowNew] = useState(false);

  return (
    <div
      className={`flex flex-col gap-2 ${interaction.id !== "1" ? "ml-8" : ""} ${
        interaction.answer
          ? "border-b-4 border-gray-100 border-dashed pb-2"
          : ""
      }
      `}
    >
      <div
        className={`inline-flex align-center gap-1  ${
          interaction.answer ? "" : "text-blue-500 underline cursor-pointer"
        } `}
        tabIndex={interaction.answer ? -1 : 1}
        style={{ width: "fit-content" }}
        onClick={() => {
          ask(interaction);
        }}
      >
        {interaction.loading ? (
          <RefreshCw className="animate-spin shrink-0 w-3 h-3 mt-1.5 mr-1" />
        ) : (
          <></>
        )}
        <span>
          {interaction.id} - {interaction.question}{" "}
          {interaction.error ? <span className="text-red-500">error</span> : ""}
        </span>
      </div>
      {interaction.answer ? (
        <details>
          <summary className="border-l-4 border-gray-300 px-3 py-1 text-black">
            {interaction.answer}
          </summary>
          {interaction.following && interaction.following.length >= 0 ? (
            <div className="flex flex-col gap-2 mt-2">
              {interaction.following?.map((subInteraction) => {
                return (
                  <Interaction
                    key={subInteraction.id}
                    interaction={subInteraction}
                  />
                );
              })}
              <div className="flex flex-col gap-1 ml-8">
                {showNew ? (
                  <>
                    <label htmlFor="question-input">
                      {interaction.id}.{interaction.following.length + 1}{" "}
                      Agregar pregunta propia:
                    </label>
                    <textarea
                      id="question-input"
                      value={newQuestion}
                      placeholder="Escribí otra pregunta"
                      className="border rounded px-2 inline-block w-fit"
                      onChange={(e) => {
                        const value = e.target.value;
                        setNewQuestion(value);
                      }}
                    />
                    <button
                      className="group border rounded px-3 w-fit flex items-center gap-1"
                      style={{ transition: "width 0.2s" }}
                      onClick={() => {
                        const { id, following = [] } = interaction;
                        const newInteraction = {
                          id: `${id}.${following.length + 1}`,
                          question: newQuestion,
                          loading: false,
                          error: false,
                        };
                        updateInteraction(id, {
                          following: [...following, newInteraction],
                        });

                        ask(newInteraction);

                        setShowNew(false);
                        setNewQuestion("");
                      }}
                    >
                      Agregar y preguntar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setShowNew(true);
                      }}
                      className="w-fit"
                    >
                      <PlusCircle className="w-4 h-4 text-blue-500 hover:fill-gray-200 hover:text-blue-800 cursor-pointer" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : null}
        </details>
      ) : null}
    </div>
  );
};
