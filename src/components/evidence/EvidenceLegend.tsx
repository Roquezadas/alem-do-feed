import type { EvidenceNodeType } from "@/lib/evidenceGraph";
import { evidenceTypeLabel } from "@/lib/evidenceGraph";

const items: EvidenceNodeType[] = ["topic", "law", "case", "episode", "concept"];

export function EvidenceLegend() {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {items.map((type) => (
        <div key={type} className="label-mono flex items-center gap-2 text-muted-foreground">
          <span className={`evidence-legend-dot evidence-dot-${type}`} aria-hidden="true" />
          {evidenceTypeLabel[type]}
        </div>
      ))}
    </div>
  );
}
