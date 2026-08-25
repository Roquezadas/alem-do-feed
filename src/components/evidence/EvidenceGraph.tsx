import { useMemo, useState } from "react";
import type { EvidenceGraph as EvidenceGraphData, EvidenceNode as EvidenceNodeData } from "@/lib/evidenceGraph";
import { EvidenceNode } from "./EvidenceNode";

const positionPresets = [
  { x: 19, y: 25 },
  { x: 50, y: 10 },
  { x: 81, y: 25 },
  { x: 87, y: 54 },
  { x: 73, y: 83 },
  { x: 50, y: 91 },
  { x: 27, y: 83 },
  { x: 13, y: 54 },
  { x: 32, y: 43 },
  { x: 68, y: 43 },
  { x: 38, y: 67 },
  { x: 62, y: 67 },
];

function centerOf(nodeId: string, nodes: EvidenceNodeData[], centerId: string) {
  if (nodeId === centerId) return { x: 50, y: 52 };
  const index = nodes.findIndex((node) => node.id === nodeId);
  return positionPresets[index % positionPresets.length];
}

export function EvidenceGraph({
  graph,
  activeId,
  visibleIds,
  onSelect,
}: {
  graph: EvidenceGraphData;
  activeId: string | null;
  visibleIds: Set<string>;
  onSelect: (node: EvidenceNodeData) => void;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const visibleNodes = useMemo(
    () => graph.nodes.filter((node) => visibleIds.has(node.id)),
    [graph.nodes, visibleIds],
  );

  return (
    <div className="evidence-graph-shell" onMouseLeave={() => setHoveredId(null)}>
      <svg
        className="evidence-graph-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <filter id="evidence-soft"><feGaussianBlur stdDeviation="0.55" /></filter>
        </defs>

        {graph.edges
          .filter((edge) => visibleIds.has(edge.to))
          .map((edge) => {
            const from = centerOf(edge.from, visibleNodes, graph.center.id);
            const to = centerOf(edge.to, visibleNodes, graph.center.id);
            const active = activeId === edge.to || hoveredId === edge.to || activeId === edge.from;
            const muted = Boolean(activeId || hoveredId) && !active;
            return (
              <path
                key={edge.id}
                d={`M ${from.x} ${from.y} C ${from.x} ${(from.y + to.y) / 2}, ${to.x} ${(from.y + to.y) / 2}, ${to.x} ${to.y}`}
                className={`evidence-edge evidence-edge-${edge.relationship} ${active ? "is-active" : ""} ${muted ? "is-muted" : ""}`}
              />
            );
          })}

        <circle cx="50" cy="52" r="9.5" className="evidence-core-glow" filter="url(#evidence-soft)" />
        <circle cx="50" cy="52" r="9" className="evidence-core-ring" />
      </svg>

      <div className="evidence-graph-center-wrap">
        <button
          type="button"
          className="evidence-core"
          onClick={() => onSelect(graph.center)}
          onMouseEnter={() => setHoveredId(graph.center.id)}
          onFocus={() => setHoveredId(graph.center.id)}
          aria-label={`Abrir tópico ${graph.center.title}`}
        >
          <span className="label-mono text-primary">TÓPICO CENTRAL</span>
          <strong>{graph.center.title}</strong>
          <span className="label-mono opacity-55">{graph.nodes.length} conexões</span>
        </button>
      </div>

      {visibleNodes.map((node, index) => {
        const p = positionPresets[index % positionPresets.length];
        const isActive = activeId === node.id || hoveredId === node.id;
        const isMuted = Boolean(activeId || hoveredId) && !isActive;
        return (
          <div
            key={node.id}
            className="evidence-graph-node-wrap"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <div
              onMouseEnter={() => setHoveredId(node.id)}
              onFocus={() => setHoveredId(node.id)}
            >
              <EvidenceNode node={node} active={isActive} muted={isMuted} onSelect={() => onSelect(node)} />
            </div>
          </div>
        );
      })}

      <div className="evidence-mobile-list" aria-label="Conexões do tópico">
        <button
          type="button"
          className="evidence-core"
          onClick={() => onSelect(graph.center)}
          aria-label={`Abrir tópico ${graph.center.title}`}
        >
          <span className="label-mono text-primary">TÓPICO CENTRAL</span>
          <strong>{graph.center.title}</strong>
          <span className="label-mono opacity-55">{graph.nodes.length} conexões</span>
        </button>

        {visibleNodes.map((node) => (
          <EvidenceNode
            key={node.id}
            node={node}
            active={activeId === node.id}
            muted={false}
            onSelect={() => onSelect(node)}
          />
        ))}
      </div>
    </div>
  );
}
