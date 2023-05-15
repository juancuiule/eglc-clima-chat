import { useInteractionStore } from "@/hooks/useInteractionStore";
import { InteractionData } from "@/utils/types";
import { memo } from "react";
import { RefreshCw } from "react-feather";
import { Handle, NodeProps, Position } from "reactflow";

const CustomNode = ({
  data,
  isConnectable,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom,
}: NodeProps<InteractionData>) => {
  const interaction = data;

  const { ask } = useInteractionStore();

  return (
    <>
      {data.id !== "1" && (
        <Handle
          type="target"
          position={targetPosition}
          isConnectable={isConnectable}
        />
      )}
      <div className="w-96 px-4 py-2 border rounded border-grey-900 bg-white">
        <div
          className={`inline-flex align-center gap-1  ${
            interaction.answer ? "" : "text-blue-500 underline cursor-pointer"
          } `}
          tabIndex={interaction.answer ? -1 : 1}
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
            {interaction.error ? (
              <span className="text-red-500">error</span>
            ) : (
              ""
            )}
          </span>
        </div>
        {interaction.answer && (
          <details className="mt-2" open>
            <summary className="cursor-pointer">Ver respuesta</summary>
            <div className="-ml-2 px-3 py-1 text-gray-600">
              {interaction.answer}
            </div>
          </details>
        )}
      </div>
      {interaction.following && (
        <Handle
          type="source"
          position={sourcePosition}
          isConnectable={isConnectable}
        />
      )}
    </>
  );
};

CustomNode.displayName = "CustomNode";

export default memo(CustomNode);
