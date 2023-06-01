"use client";

import { memo, useState } from "react";
import {
  Background,
  NodeProps,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState
} from "reactflow";

import "reactflow/dist/style.css";

export const CustomNode = memo((props: NodeProps<{ selected: boolean }>) => {
  const { selected } = props.data;

  return (
    <div
      className={`
      z-20 border border-gray-300 rounded w-60 p-2
      bg-gray-50 ${selected ? "border-blue-500" : ""}
    `}
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-sm">Question:</h2>
        <p className="text-gray-700 text-xs">{"Algo algo"}</p>
      </div>
    </div>
  );
});

CustomNode.displayName = "CustomNode";

const nodeTypes = {
  custom: CustomNode,
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      type: "custom",
      id: "1",
      position: { x: 500, y: 0 },
      data: {},
    },
    {
      type: "custom",
      id: "2",
      position: { x: 0, y: 0 },
      data: {},
    },
    {
      type: "custom",
      id: "3",
      position: { x: 250, y: 200 },
      data: {},
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [selected, setSelected] = useState<string[]>([]);

  return (
    <div className="flex min-h-screen px-5 py-5 gap-4 flex-col xl:flex-row">
      <div
        className={"z-50 absolute w-screen h-full bg-white -l-5 top-0 left-0"}
      >
        <ReactFlow
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodes={nodes.map((node) =>
            selected.includes(node.id)
              ? { ...node, data: { selected: true } }
              : node
          )}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={(event, node) => {
            if (event.metaKey) {
              setSelected((selected) =>
                selected.includes(node.id)
                  ? selected.filter((id) => id !== node.id)
                  : [...selected, node.id]
              );
            }
          }}
          fitView
          onPaneClick={() => {
            setSelected([]);
          }}
        >
          <Panel position="top-right">
            <div className="flex flex-col gap-4 px-4 py-2 bg-white rounded shadow-md w-60 h-">
              <span>Controles</span>
              <button className="bg-gray-200 hover:bg-gray-400 hover:text-gray-50 transition-colors rounded p-2">
                Nueva pregunta
              </button>
              {selected.length > 1 ? (
                <button className="bg-gray-200 hover:bg-gray-400 hover:text-gray-50 transition-colors rounded p-2">
                  Relacionar {selected.length} preguntas
                </button>
              ) : null}
            </div>
          </Panel>
          <Background style={{ backgroundColor: "#fafafa" }} />
        </ReactFlow>
      </div>
    </div>
  );
}
