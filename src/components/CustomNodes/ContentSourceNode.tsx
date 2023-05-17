import { Source } from "@/utils/types";
import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

const ContentSourceNode = ({ data }: NodeProps<Source>) => {
  const interaction = data;

  const {
    source: { pageContent, metadata },
    score,
  } = interaction;

  return (
    <>
      <div className="group flex items-center gap-2">
        <div className="flex flex-col justify-center items-center">
          <Handle type="target" position={Position.Left} isConnectable />
          <div className="w-96 px-4 py-2 border rounded border-grey-900 bg-white">
            <details>
              <summary className="cursor-pointer">Ver fuente</summary>
              <div className="-ml-2 px-3 py-1 text-gray-600">
                {pageContent} -{" "}
                <a
                  href={`/static/${metadata.source.replace(
                    "/content/drive/MyDrive/Textos Clima/",
                    ""
                  )}`}
                  target="_blank"
                  rel="noreferer"
                  className="text-xs text-gray-300 underline"
                >
                  {metadata.source}
                </a>
              </div>
            </details>
          </div>
        </div>
      </div>
    </>
  );
};

ContentSourceNode.displayName = "ContentSourceNode";

export default memo(ContentSourceNode);
