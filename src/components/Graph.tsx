import { memo, useEffect } from "react";
import ReactFlow, {
  Background,
  Edge,
  Node,
  NodeProps,
  Position,
  XYPosition,
  useEdgesState,
  useNodesState,
} from "reactflow";

import "reactflow/dist/style.css";

import { useInteractionStore } from "@/hooks/useInteractionStore";
import { InteractionData } from "@/utils/types";
import CustomNode from "./CustomNodes/CustomNode";
import ContentSourceNode from "./CustomNodes/ContentSourceNode";

const prevPosition = (id: string, nodes: Node[]) => {
  return nodes.find((node) => node.id === id)?.position;
};

const interactionToNode = (
  interaction: InteractionData,
  position: XYPosition = { x: 0, y: 0 }
): Node[] => {
  const { id, sources = [] } = interaction;

  return [
    ...sources.map((source, i) => ({
      id: `${id}-source-${i + 1}`,
      type: "contentSource",
      data: source,
      position: {
        x: position.x + 420 + 40,
        y: position.y + 50 * i,
      },
    })),
    {
      id,
      data: interaction,
      position,
      type: "custom",
    },
  ];
};

const flattenInteraction = (
  interaction: InteractionData
): InteractionData[] => {
  const { following = [] } = interaction;
  return [interaction, ...following.flatMap(flattenInteraction)];
};

const nodeTypes = {
  custom: CustomNode,
  contentSource: ContentSourceNode,
};

const newNodesFromData = (prevNodes: Node[], data: InteractionData) => {
  const everyInteraction = flattenInteraction(data);
  return everyInteraction.map((node) => {
    const levels = node.id.split(".");
    const fatherId = levels.slice(0, -1).join(".");
    const [childNumber] = levels.slice(-1);
    let position = prevPosition(node.id, prevNodes) || { x: 0, y: 0 };
    if (fatherId !== "") {
      const { x, y } = prevPosition(fatherId, prevNodes) || { x: 0, y: 0 };
      position.x = x + (parseInt(childNumber, 10) - 1) * 400;
      position.y = y + levels.length * 100;
    }
    return interactionToNode(node, position);
  });
};

const newEdgesFromData = (prevEdges: Edge[], data: InteractionData) => {
  const everyInteraction = flattenInteraction(data);

  const newEdges = everyInteraction
    .filter((i) => i.following !== undefined)
    .flatMap(({ id, following = [], sources = [] }) => {
      const followEdges = following.map(
        ({ id: subId, following: subFollowing = [] }) => {
          return {
            id: `e-${id}-${subId}`,
            source: id,
            target: subId,
            animated: subFollowing.length !== 0,
          };
        }
      );
      const sourceEdges = sources.map((source, i) => ({
        id: `e-${id}-source-${i + 1}`,
        source: id,
        target: `${id}-source-${i + 1}`,
        sourceHandle: "source-handle",
      }));
      return [...followEdges, ...sourceEdges];
    });

  return [
    ...prevEdges,
    ...newEdges.filter((e) => !prevEdges.map((_) => _.id).includes(e.id)),
  ];
};

export function Graph() {
  const { data } = useInteractionStore();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    setNodes((prevNodes) => newNodesFromData(prevNodes, data).flat(2));
  }, [data, setNodes, setEdges]);

  useEffect(() => {
    const nodesIds = nodes.map((n) => n.id);
    setEdges((prevEdges) =>
      newEdgesFromData(prevEdges, data).filter((e) => {
        return nodesIds.includes(e.source) && nodesIds.includes(e.target);
      })
    );
  }, [data, nodes, setEdges]);

  return (
    <ReactFlow
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
    >
      <Background style={{ backgroundColor: "#fafafa" }} />
    </ReactFlow>
  );
}
