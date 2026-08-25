import { Search, SlidersHorizontal } from "lucide-react";
import type { EvidenceNodeType } from "@/lib/evidenceGraph";
import { evidenceTypeLabel } from "@/lib/evidenceGraph";

const filters: Array<{ id: "all" | EvidenceNodeType; label: string }> = [
  { id: "all", label: "TODOS" },
  { id: "law", label: "LEIS" },
  { id: "case", label: "CASOS" },
  { id: "episode", label: "EPISÓDIOS" },
  { id: "concept", label: "CONCEITOS" },
];

export function EvidenceFilters({
  query,
  onQueryChange,
  type,
  onTypeChange,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  type: "all" | EvidenceNodeType;
  onTypeChange: (value: "all" | EvidenceNodeType) => void;
}) {
  return (
    <div className="evidence-controls">
      <div className="evidence-search">
        <Search size={16} aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Buscar uma lei, caso, conceito ou episódio..."
          aria-label="Buscar evidências"
        />
      </div>

      <div className="evidence-filter-list" aria-label="Filtrar evidências">
        <span className="label-mono inline-flex items-center gap-2 text-muted-foreground">
          <SlidersHorizontal size={13} aria-hidden="true" /> FILTRAR
        </span>
        {filters.map((filter) => {
          const active = type === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onTypeChange(filter.id)}
              className={`label-mono evidence-filter ${active ? "is-active" : ""}`}
              aria-pressed={active}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { evidenceTypeLabel };
