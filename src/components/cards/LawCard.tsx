import { useState } from "react";
import { Tag } from "@/components/Tag";
import type { Law } from "@/data/types";

export function LawCard({ law }: { law: Law }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="frame-open flex flex-col p-5">
      <Tag tone="ink" className="self-start">
        {law.category}
      </Tag>
      <p className="label-mono mt-4 text-primary">{law.article}</p>
      <h3 className="mt-2 text-lg leading-snug font-bold">{law.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{law.summary}</p>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="label-mono mt-5 self-start border-b border-primary pb-1 text-primary"
      >
        {open ? "FECHAR ARTIGO" : "LER ARTIGO →"}
      </button>

      {open ? (
        <blockquote className="animate-rise mt-4 border-l-2 border-accent bg-muted p-4 text-sm leading-relaxed">
          {law.text}
        </blockquote>
      ) : null}

      <a
        href={law.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="label-mono mt-4 text-muted-foreground underline-offset-4 hover:underline"
      >
        FONTE OFICIAL ↗
      </a>
    </article>
  );
}
