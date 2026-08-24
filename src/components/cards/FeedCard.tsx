import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Tag } from "@/components/Tag";
import type { FeedItem } from "@/data/types";

const layers = [
  { key: "layerContext", label: "CONTEXTO" },
  { key: "layerLaw", label: "DIREITO" },
  { key: "layerConsequence", label: "CONSEQUÊNCIA" },
] as const;

export function FeedCard({ item }: { item: FeedItem }) {
  const [step, setStep] = useState(0);
  const beyond = step > 0;

  return (
    <article className="frame-open group relative flex flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-dashed px-4 py-3">
        <Tag tone={beyond ? "cobalt" : "ink"}>{item.label}</Tag>
        <time className="label-mono text-muted-foreground" dateTime={item.date}>
          {new Date(item.date).toLocaleDateString("pt-BR")}
        </time>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg leading-snug font-bold">{item.title}</h3>

        {!beyond ? (
          <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
        ) : (
          <div className="animate-slide-left mt-3 space-y-3">
            {layers.slice(0, step).map((layer) => (
              <div key={layer.key} className="border-l-2 border-primary pl-3">
                <span className="label-mono text-muted-foreground">{layer.label}</span>
                <p className="mt-1 text-sm leading-relaxed">{item[layer.key]}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
          {step < layers.length ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="label-mono bg-foreground px-3 py-2 text-background transition-transform hover:-translate-y-0.5"
            >
              {step === 0
                ? "IR ALÉM →"
                : step === 1
                  ? "VER O FUNDAMENTO →"
                  : "MOSTRAR CONSEQUÊNCIA →"}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setStep(0)}
              className="label-mono border border-current px-3 py-2 text-muted-foreground"
            >
              VOLTAR AO FEED
            </button>
          )}

          {item.href ? (
            <Link
              to={item.href}
              className="label-mono text-primary underline-offset-4 hover:underline"
            >
              ABRIR PÁGINA
            </Link>
          ) : null}
        </div>
      </div>

      <div className="label-mono flex gap-1 border-t border-dashed px-4 py-2 text-muted-foreground">
        {item.tags.map((t) => (
          <span key={t} className="after:ml-1 after:content-['·'] last:after:content-['']">
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}
