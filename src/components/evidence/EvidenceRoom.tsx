import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDownRight, Check, Maximize2 } from "lucide-react";
import { EvidenceDetail } from "./EvidenceDetail";
import { EvidenceFilters } from "./EvidenceFilters";
import { EvidenceGraph } from "./EvidenceGraph";
import { EvidenceLegend } from "./EvidenceLegend";
import { buildEvidenceGraph, evidenceRelationshipLabel, type EvidenceNodeType } from "@/lib/evidenceGraph";
import { topics } from "@/data/topics";

const INITIAL_TOPIC = "direito-a-imagem";

type FilterType = "all" | EvidenceNodeType;

export function EvidenceRoom() {
  const [topicSlug, setTopicSlug] = useState(INITIAL_TOPIC);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("topic");
    if (requested && topics.some((topic) => topic.slug === requested)) {
      setTopicSlug(requested);
    }
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("topic", topicSlug);
    window.history.replaceState({}, "", url);
  }, [topicSlug]);

  const graph = useMemo(() => buildEvidenceGraph(topicSlug), [topicSlug]);
  const activeNode = graph?.nodes.find((node) => node.id === activeId) ?? (graph?.center.id === activeId ? graph.center : null);
  const activeEdge = graph?.edges.find((edge) => edge.to === activeId);

  const visibleIds = useMemo(() => {
    if (!graph) return new Set<string>();
    const lower = query.trim().toLocaleLowerCase("pt-BR");
    const filtered = graph.nodes.filter((node) => {
      if (filter !== "all" && node.type !== filter) return false;
      if (!lower) return true;
      return [node.title, node.subtitle, node.description]
        .filter(Boolean)
        .some((value) => value!.toLocaleLowerCase("pt-BR").includes(lower));
    });
    const limited = !query && !expanded ? filtered.slice(0, 8) : filtered;
    return new Set(limited.map((node) => node.id));
  }, [graph, filter, query, expanded]);

  const allVisible = graph ? visibleIds.size >= graph.nodes.length : true;
  const topicOptions = topics;

  function handleTopicChange(value: string) {
    setTopicSlug(value);
    setActiveId(null);
    setFilter("all");
    setQuery("");
    setExpanded(false);
  }

  function handleSelect(node: NonNullable<typeof activeNode>) {
    setActiveId(node.id);
  }

  function handleFollow(slug: string) {
    handleTopicChange(slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function copyLink() {
    const url = new URL(window.location.href);
    url.searchParams.set("topic", topicSlug);
    await navigator.clipboard.writeText(url.toString());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  if (!graph) return null;

  return (
    <div className={expanded ? "evidence-room is-expanded" : "evidence-room"}>
      <section className="surface-dark evidence-hero">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="label-mono text-primary">ARQUIVO JURÍDICO • ADF</p>
              <h1 className="mt-5 max-w-3xl text-6xl leading-[0.83] font-extrabold tracking-[-0.07em] uppercase md:text-8xl">
                Sala
                <br />
                de evidências
              </h1>
            </div>
            <div className="max-w-xl lg:ml-auto">
              <div className="evidence-hero-frame">
                <div className="evidence-hero-frame-back" aria-hidden="true" />
                <p className="label-mono text-coral">SIGA AS CONEXÕES.</p>
                <p className="mt-5 text-xl leading-relaxed text-white/80 md:text-2xl">
                  Uma pergunta raramente termina em uma única resposta. Aqui, cada conceito leva a uma lei, um caso, um episódio ou outra discussão.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link to="/feed-experimental" className="label-mono bg-primary px-4 py-3 text-primary-foreground">
                    VER A PRÁTICA →
                  </Link>
                  <button type="button" onClick={copyLink} className="label-mono border border-white/25 px-4 py-3 text-white">
                    {copied ? "LINK COPIADO ✓" : "COMPARTILHAR CONEXÃO"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-background px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-[auto_1fr_auto] md:items-end">
            <div>
              <p className="label-mono text-primary">EXPLORAR TEMA</p>
              <label className="mt-2 block text-3xl font-extrabold tracking-tight" htmlFor="evidence-topic">
                O que você quer investigar?
              </label>
            </div>
            <select
              id="evidence-topic"
              value={topicSlug}
              onChange={(event) => handleTopicChange(event.target.value)}
              className="h-12 w-full max-w-xl border border-foreground bg-card px-4 font-display font-bold outline-none focus:ring-2 focus:ring-primary"
            >
              {topicOptions.map((topic) => (
                <option key={topic.id} value={topic.slug}>
                  {topic.name}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => setExpanded((value) => !value)} className="label-mono inline-flex items-center justify-center gap-2 border border-foreground px-4 py-3">
              <Maximize2 size={14} /> {expanded ? "SAIR DA SALA" : "EXPANDIR SALA"}
            </button>
          </div>

          <div className="mt-8">
            <EvidenceFilters query={query} onQueryChange={setQuery} type={filter} onTypeChange={setFilter} />
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-5 border-b pb-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label-mono text-primary">MAPA DA QUESTÃO</p>
              <h2 className="mt-2 max-w-3xl text-4xl leading-none font-extrabold tracking-tight md:text-6xl">
                Siga o fio de <span className="text-primary">{graph.center.title.toLowerCase()}</span>.
              </h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Selecione uma peça para descobrir onde ela leva. As linhas mostram relações de fundamento, jurisprudência, podcast e conceitos relacionados.
              </p>
            </div>
            <EvidenceLegend />
          </div>

          <div className="evidence-workspace">
            <EvidenceGraph graph={graph} activeId={activeId} visibleIds={visibleIds} onSelect={handleSelect} />

            {activeNode ? (
              <EvidenceDetail
                node={activeNode}
                relationship={activeEdge?.relationship}
                onClose={() => setActiveId(null)}
                onFollow={handleFollow}
              />
            ) : null}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-5">
            <div className="label-mono text-muted-foreground">
              {visibleIds.size} {visibleIds.size === 1 ? "CONEXÃO VISÍVEL" : "CONEXÕES VISÍVEIS"}
            </div>
            {!allVisible && graph.nodes.length > visibleIds.size ? (
              <button type="button" onClick={() => setExpanded(true)} className="label-mono inline-flex items-center gap-2 bg-foreground px-4 py-3 text-background">
                MOSTRAR TODAS AS CONEXÕES <ArrowDownRight size={14} />
              </button>
            ) : (
              <span className="label-mono inline-flex items-center gap-2 text-primary">
                <Check size={14} /> MAPA COMPLETO
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="surface-dark border-y px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="label-mono text-coral">O QUE ESTA SALA FAZ</p>
            <h2 className="mt-5 text-5xl leading-[0.9] font-extrabold tracking-[-0.05em] uppercase md:text-7xl">
              Uma publicação parece um ponto.
              <br />
              <span className="text-primary">O Direito revela uma rede.</span>
            </h2>
          </div>
          <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
            {[
              ["01", "PUBLICAÇÃO", "O que apareceu na tela."],
              ["02", "PESSOA", "Quem foi identificado ou afetado."],
              ["03", "DIREITO", "Qual proteção jurídica entra em jogo."],
              ["04", "CONSEQUÊNCIA", "O que pode acontecer depois."],
            ].map(([n, title, text]) => (
              <div key={n} className="bg-[var(--ink)] p-6 md:p-8">
                <span className="label-mono text-primary">{n}</span>
                <h3 className="mt-8 text-xl font-extrabold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <p className="label-mono text-primary">ALÉM DO FEED</p>
          <h2 className="mt-5 text-5xl leading-[0.88] font-extrabold tracking-[-0.06em] uppercase md:text-8xl">
            Algumas respostas não estão em uma lei.
            <br />
            <span className="text-primary">Estão nas conexões entre elas.</span>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/feed-experimental" className="label-mono bg-primary px-5 py-4 text-primary-foreground">
              IR PARA O FEED EXPERIMENTAL →
            </Link>
            <Link to="/episodios" className="label-mono border border-foreground px-5 py-4">
              VER EPISÓDIOS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
