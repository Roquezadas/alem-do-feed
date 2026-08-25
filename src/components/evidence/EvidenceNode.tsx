import { ExternalLink, Gavel, FileText, Mic2, Network } from "lucide-react";
import type { EvidenceNode as EvidenceNodeData } from "@/lib/evidenceGraph";
import { evidenceTypeLabel } from "@/lib/evidenceGraph";
import { cn } from "@/lib/utils";

const icons = {
  topic: Network,
  law: FileText,
  case: Gavel,
  episode: Mic2,
  concept: Network,
} as const;

const typeStyles = {
  topic: "evidence-node-topic",
  law: "evidence-node-law",
  case: "evidence-node-case",
  episode: "evidence-node-episode",
  concept: "evidence-node-concept",
} as const;

export function EvidenceNode({
  node,
  active,
  muted,
  onSelect,
}: {
  node: EvidenceNodeData;
  active: boolean;
  muted: boolean;
  onSelect: () => void;
}) {
  const Icon = icons[node.type];

  return (
    <button
      type="button"
      className={cn(
        "evidence-node group text-left",
        typeStyles[node.type],
        active && "evidence-node-active",
        muted && "evidence-node-muted",
      )}
      onClick={onSelect}
      aria-label={`Abrir ${evidenceTypeLabel[node.type]}: ${node.subtitle ?? node.title}`}
      aria-pressed={active}
    >
      <span className="evidence-node-accent" aria-hidden="true" />
      <span className="flex items-start justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2">
          <Icon size={15} strokeWidth={1.6} aria-hidden="true" />
          <span className="label-mono opacity-70">{evidenceTypeLabel[node.type]}</span>
        </span>
        <ExternalLink
          size={13}
          className="shrink-0 opacity-0 transition-opacity group-hover:opacity-50"
          aria-hidden="true"
        />
      </span>
      <strong className="mt-3 block text-[0.95rem] leading-tight tracking-[-0.02em]">
        {node.subtitle ?? node.title}
      </strong>
      {node.title && node.subtitle ? (
        <span className="label-mono mt-2 block opacity-55">{node.title}</span>
      ) : null}
    </button>
  );
}
