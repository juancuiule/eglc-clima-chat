"use client";
import { useToggle } from "@/hooks/useToggle";
import { Maximize, X } from "react-feather";
import { Background, ReactFlow, useEdgesState, useNodesState } from "reactflow";

import "reactflow/dist/style.css";
import { Audio, Question, Source, Text2Image } from ".";

const nodeTypes = {
  question: Question,
  text2image: Text2Image,
  source: Source,
  audio: Audio,
};

export default function App() {
  const [fullscreen, toggle] = useToggle(true);

  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      type: "question",
      id: "1",
      position: { x: 0, y: 0 },
      data: {
        question: "¿Cuánto emite la ganadería?",
        answer:
          "El sector ganadero es responsable del 21,6% de las emisiones totales de gases de efecto invernadero en Argentina, según el Inventario Nacional de Gases de Efecto Invernadero publicado en 2019 por la Secretaría de Ambiente y Desarrollo Sustentable de la Nación. Las vacas son la principal fuente de emisiones de metano (CH4), seguido de las emisiones de este mismo gas provenientes de los cultivos de arroz.",
      },
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <div className="flex min-h-screen px-5 py-5 gap-4 flex-col xl:flex-row">
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
        <ReactFlow
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
        >
          <Background style={{ backgroundColor: "#fafafa" }} />
        </ReactFlow>
      </div>
    </div>
  );
}
