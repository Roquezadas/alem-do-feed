import { useState } from "react";
import { Tag } from "@/components/Tag";
import { statusLabel } from "@/data/questions";
import type { Question } from "@/data/types";
import { getLaw } from "@/data/laws";

const tone = {
  permitido: "cobalt",
  depende: "default",
  risco: "coral",
} as const;

export function QuestionCard({ item }: { item: Question }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="frame-open flex flex-col p-5 transition-shadow hover:shadow-[6px_6px_0_0_var(--color-foreground)]">
      <Tag tone={tone[item.status]} className="self-start">
        {statusLabel[item.status]}
      </Tag>

      <h3 className="mt-4 text-lg leading-snug font-bold">{item.question}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{item.shortAnswer}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {item.references.map((r) => (
          <Tag key={r} tone="outline">
            {r}
          </Tag>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="label-mono mt-5 self-start border-b border-primary pb-1 text-primary"
      >
        {open ? "FECHAR EXPLICAÇÃO" : "VER EXPLICAÇÃO →"}
      </button>

      {open ? (
        <div className="animate-rise mt-4 border-t border-dashed pt-4">
          <span className="label-mono text-muted-foreground">FUNDAMENTO</span>
          <p className="mt-2 text-sm leading-relaxed">{item.reasoning}</p>
          <ul className="mt-4 space-y-2">
            {item.lawIds.map((id) => {
              const law = getLaw(id);
              if (!law) return null;
              return (
                <li key={id} className="text-sm">
                  <a
                    href={law.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-primary underline-offset-4"
                  >
                    <span className="label-mono">{law.article}</span> — {law.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </article>
  );
}
