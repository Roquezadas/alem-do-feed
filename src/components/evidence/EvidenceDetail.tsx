import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { EvidenceNode } from "@/lib/evidenceGraph";
import { evidenceRelationshipLabel, evidenceTypeLabel } from "@/lib/evidenceGraph";
import { Tag } from "@/components/Tag";

export function EvidenceDetail({
  node,
  relationship,
  onClose,
  onFollow,
}: {
  node: EvidenceNode;
  relationship?: string;
  onClose: () => void;
  onFollow: (slug: string) => void;
}) {
  const topic = node.topic;
  const law = node.law;
  const item = node.case;
  const episode = node.episode;

  return (
    <aside className="evidence-detail" aria-label={`Detalhes: ${node.subtitle ?? node.title}`}>
      <div className="flex items-start justify-between gap-4 border-b border-dashed p-5 md:p-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Tag
              tone={node.type === "case" ? "cobalt" : node.type === "episode" ? "outline" : "ink"}
            >
              {evidenceTypeLabel[node.type]}
            </Tag>
            {relationship ? (
              <Tag tone="outline">
                {evidenceRelationshipLabel[relationship as keyof typeof evidenceRelationshipLabel]}
              </Tag>
            ) : null}
          </div>
          <h3 className="mt-4 text-2xl font-extrabold tracking-tight md:text-3xl">
            {node.subtitle ?? node.title}
          </h3>
          {node.subtitle ? <p className="label-mono mt-2 text-primary">{node.title}</p> : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="grid h-9 w-9 shrink-0 place-items-center border border-foreground"
          aria-label="Fechar evidência"
        >
          <X size={17} />
        </button>
      </div>

      <div className="space-y-6 p-5 md:p-6">
        {topic ? (
          <>
            <div>
              <p className="label-mono text-primary">O QUE É</p>
              <p className="mt-2 leading-relaxed">{topic.definition}</p>
            </div>
            <div className="border-l-2 border-cobalt pl-4">
              <p className="label-mono text-muted-foreground">BASE JURÍDICA</p>
              <p className="mt-2 leading-relaxed">{topic.legalBasis}</p>
            </div>
            <div>
              <p className="label-mono text-accent">EXEMPLO</p>
              <p className="mt-2 leading-relaxed">{topic.example}</p>
            </div>
            <button
              type="button"
              onClick={() => onFollow(topic.slug)}
              className="label-mono inline-flex items-center gap-2 bg-primary px-4 py-3 text-primary-foreground"
            >
              EXPLORAR ESTE TÓPICO <ArrowUpRight size={14} />
            </button>
          </>
        ) : null}

        {law ? (
          <>
            <div>
              <p className="label-mono text-primary">NORMA</p>
              <p className="mt-2 font-semibold">{law.name}</p>
              <p className="label-mono mt-1 opacity-60">{law.article}</p>
            </div>
            <div>
              <p className="label-mono text-muted-foreground">O QUE ISSO PROTEGE</p>
              <p className="mt-2 leading-relaxed">{law.summary}</p>
            </div>
            <blockquote className="border-l-2 border-accent bg-muted p-4 text-sm leading-relaxed">
              {law.text}
            </blockquote>
            <a
              href={law.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label-mono inline-flex items-center gap-2 text-primary underline-offset-4 hover:underline"
            >
              FONTE OFICIAL <ExternalLink size={13} />
            </a>
          </>
        ) : null}

        {item ? (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone="cobalt">{item.court}</Tag>
              <span className="label-mono text-muted-foreground">{item.process}</span>
            </div>
            <div>
              <p className="label-mono text-muted-foreground">QUESTÃO JURÍDICA</p>
              <p className="mt-2 leading-relaxed">{item.legalIssue}</p>
            </div>
            <div>
              <p className="label-mono text-muted-foreground">ENTENDIMENTO</p>
              <p className="mt-2 leading-relaxed">{item.decision}</p>
            </div>
            <div className="border-l-2 border-accent pl-4">
              <p className="label-mono text-accent">POR QUE ISSO IMPORTA?</p>
              <p className="mt-2 leading-relaxed">{item.whyItMatters}</p>
            </div>
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label-mono inline-flex items-center gap-2 text-primary underline-offset-4 hover:underline"
            >
              VER DECISÃO ORIGINAL <ExternalLink size={13} />
            </a>
          </>
        ) : null}

        {episode ? (
          <>
            <div>
              <p className="label-mono text-primary">{episode.number}</p>
              <h4 className="mt-2 text-xl font-extrabold">{episode.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{episode.subtitle}</p>
            </div>
            <p className="leading-relaxed">{episode.description}</p>
            <Link
              to="/episodios/$slug"
              params={{ slug: episode.slug }}
              className="label-mono inline-flex items-center gap-2 bg-primary px-4 py-3 text-primary-foreground"
            >
              ABRIR DOSSIÊ DO EPISÓDIO <ArrowUpRight size={14} />
            </Link>
          </>
        ) : null}
      </div>
    </aside>
  );
}
