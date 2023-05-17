import { useInteractionStore } from "@/hooks/useInteractionStore";
import { InteractionData } from "@/utils/types";
import { memo, useState } from "react";
import { BookOpen, Image, RefreshCw } from "react-feather";
import { Handle, NodeProps, Position, useReactFlow, Node } from "reactflow";

const CustomNode = ({
  data,
  isConnectable,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom,
}: NodeProps<InteractionData>) => {
  const interaction = data;

  const { ask } = useInteractionStore();

  const {
    sources = [],
    answer,
    question,
    id,
    loading,
    error,
    following,
  } = interaction;

  return (
    <>
      <div className="group flex items-center gap-2">
        <div className="flex flex-col justify-center items-center z-20">
          {data.id !== "1" && (
            <Handle
              type="target"
              position={targetPosition}
              isConnectable={isConnectable}
            />
          )}
          {following && (
            <Handle
              type="source"
              position={sourcePosition}
              isConnectable={isConnectable}
            />
          )}
          {sources.length > 0 && (
            <Handle
              id="source-handle"
              type="source"
              position={Position.Right}
              isConnectable={isConnectable}
            />
          )}
          <div className="w-96 px-4 py-2 border rounded border-grey-900 bg-white">
            <div
              className={`inline-flex align-center gap-1 ${
                answer ? "" : "text-blue-500 underline cursor-pointer"
              } `}
              tabIndex={answer ? -1 : 1}
              onClick={() => {
                ask(interaction);
              }}
            >
              {loading ? (
                <RefreshCw className="animate-spin shrink-0 w-3 h-3 mt-1.5 mr-1" />
              ) : (
                <></>
              )}
              <span>
                {id} - {question}{" "}
                {error ? <span className="text-red-500">error</span> : ""}
              </span>
            </div>
            {answer && (
              <details className="mt-2">
                <summary className="cursor-pointer">Ver respuesta</summary>
                <div className="-ml-2 px-3 py-1 text-gray-600">{answer}</div>
              </details>
            )}
          </div>
        </div>
        {sources.length > 0 && (
          <div className="flex flex-col gap-1">
            <button
              className={`
              cursor-pointer transition-all rounded-full bg-[#1d1d1d] text-white h-fit w-fit p-2
              border border-[#1d1d1d]
              z-10 opacity-0 -translate-x-4 translate-y-4
              group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100
              hover:bg-white hover:text-[#1d1d1d]
            `}
            >
              <BookOpen size={12} />
            </button>
            <button
              className={`
              cursor-pointer transition-all rounded-full bg-[#1d1d1d] text-white h-fit w-fit p-2
              border border-[#1d1d1d]
              z-10 opacity-0 -translate-x-4
              group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100
              hover:bg-white hover:text-[#1d1d1d]
            `}
            >
              <BookOpen size={12} />
            </button>
            <button
              className={`
              cursor-pointer transition-all rounded-full bg-[#1d1d1d] text-white h-fit w-fit p-2
              border border-[#1d1d1d]
              z-10 opacity-0 -translate-x-4 -translate-y-4
              group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100
              hover:bg-white hover:text-[#1d1d1d]
            `}
            >
              <BookOpen size={12} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

CustomNode.displayName = "CustomNode";

export default memo(CustomNode);
