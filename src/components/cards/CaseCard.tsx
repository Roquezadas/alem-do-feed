import { Tag } from "@/components/Tag";
import type { Case } from "@/data/types";

export function CaseCard({ item }: { item: Case }) {
  return (
    <article className="frame-open p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Tag tone="cobalt">{item.court}</Tag>
        <Tag tone="outline">{item.theme}</Tag>
        <span className="label-mono ml-auto text-muted-foreground">{item.date}</span>
      </div>

      <p className="label-mono mt-4 text-muted-foreground">{item.process}</p>
      <h3 className="mt-2 text-xl leading-snug font-bold">{item.title}</h3>

      <dl className="mt-5 space-y-4 text-sm leading-relaxed">
        <div>
          <dt className="label-mono text-muted-foreground">O QUE ESTAVA EM DISCUSSÃO?</dt>
          <dd className="mt-1">{item.legalIssue}</dd>
        </div>
        <div>
          <dt className="label-mono text-muted-foreground">O QUE O TRIBUNAL DECIDIU?</dt>
          <dd className="mt-1">{item.decision}</dd>
        </div>
        <div>
          <dt className="label-mono text-accent">POR QUE ISSO IMPORTA?</dt>
          <dd className="mt-1">{item.whyItMatters}</dd>
        </div>
      </dl>

      <a
        href={item.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="label-mono mt-6 inline-block border-b border-primary pb-1 text-primary"
      >
        VER DECISÃO ORIGINAL →
      </a>
    </article>
  );
}
