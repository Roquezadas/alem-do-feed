import { useState } from "react";
import { Tag } from "@/components/Tag";
import type { Myth } from "@/data/types";
import { getLaw } from "@/data/laws";

export function MythCard({ item }: { item: Myth }) {
  const [open, setOpen] = useState(false);
  const tone =
    item.verdict === "MITO" ? "coral" : item.verdict === "VERDADE" ? "cobalt" : "default";

  return (
    <article className="frame-open p-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full text-left"
      >
        <span className="label-mono text-muted-foreground">MITO DO FEED</span>
        <h3 className="mt-3 text-lg leading-snug font-bold">{item.claim}</h3>
        <span className="mt-4 flex items-center justify-between gap-3">
          {open ? <Tag tone={tone}>{item.verdict}</Tag> : <Tag tone="outline">ABRIR CONTEXTO</Tag>}
          <span className="label-mono text-primary">{open ? "FECHAR" : "IR ALÉM →"}</span>
        </span>
      </button>

      {open ? (
        <div className="animate-rise mt-4 border-t border-dashed pt-4">
          <p className="text-sm leading-relaxed">{item.explanation}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.lawIds.map((id) => {
              const law = getLaw(id);
              return law ? (
                <Tag key={id} tone="outline">
                  {law.article}
                </Tag>
              ) : null;
            })}
          </div>
        </div>
      ) : null}
    </article>
  );
}
