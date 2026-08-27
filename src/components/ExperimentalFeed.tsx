import { useEffect, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ExperimentalDomino } from "@/components/ExperimentalDomino";
import { ExperimentalPost } from "@/components/ExperimentalPost";
import { Tag } from "@/components/Tag";
import { actionLabels, experimentalScenarios } from "@/data/experimentalFeed";
import type { ExperimentalScenario, FeedAction } from "@/data/types";
import feedRuptureClimax from "@/assets/feed-rupture-climax.jpg";
import { Mark } from "@/components/brand/Mark";

type ExperienceStage = "intro" | "feed" | "reveal" | "reflection";
type UserDecision = {
  scenarioId: string;
  action: FeedAction;
  risk: "low" | "attention" | "high";
  timestamp: number;
};

const riskLabel: Record<UserDecision["risk"], string> = {
  low: "RISCO BAIXO",
  attention: "ATENÇÃO",
  high: "MAIOR RISCO",
};
const riskTone: Record<UserDecision["risk"], "cobalt" | "default" | "coral"> = {
  low: "cobalt",
  attention: "default",
  high: "coral",
};

export function ExperimentalFeed() {
  const [stage, setStage] = useState<ExperienceStage>("intro");
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [decisions, setDecisions] = useState<UserDecision[]>([]);
  const [lastAction, setLastAction] = useState<FeedAction | null>(null);
  const currentScenario: ExperimentalScenario =
    experimentalScenarios[scenarioIndex] ?? experimentalScenarios[0]!;
  const total = experimentalScenarios.length;
  const progressPct =
    stage === "intro"
      ? 0
      : Math.round(((scenarioIndex + (stage === "feed" ? 0.5 : 1)) / total) * 100);

  useEffect(() => {
    if (stage === "feed")
      window.dispatchEvent(
        new CustomEvent("adf:scenario_viewed", { detail: { scenarioId: currentScenario.id } }),
      );
    if (stage === "reveal") window.dispatchEvent(new CustomEvent("adf:chain_viewed"));
  }, [currentScenario.id, stage]);

  const start = () => {
    setStage("feed");
    window.dispatchEvent(new CustomEvent("adf:experimental_started"));
  };

  const handleDecision = (action: FeedAction) => {
    if (stage !== "feed") return;
    setDecisions((current) => [
      ...current,
      {
        scenarioId: currentScenario.id,
        action,
        risk: currentScenario.consequence.risk,
        timestamp: Date.now(),
      },
    ]);
    setLastAction(action);
    setStage("reveal");
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.dispatchEvent(
      new CustomEvent("adf:decision_made", { detail: { scenarioId: currentScenario.id, action } }),
    );
  };

  const next = () => {
    if (scenarioIndex === total - 1) {
      setStage("reflection");
      window.dispatchEvent(new CustomEvent("adf:experiment_finished"));
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setScenarioIndex((value) => value + 1);
    setLastAction(null);
    setStage("feed");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reset = () => {
    setScenarioIndex(0);
    setDecisions([]);
    setLastAction(null);
    setStage("intro");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (stage === "intro") {
    return (
      <div className="experimental-shell experimental-intro">
        <div className="experimental-intro-grid" aria-hidden="true" />
        <div className="experimental-intro-frame">
          <Mark className="experimental-brand-mark" />
          <span className="label-mono text-primary">ALÉM DO FEED · ADF / 001</span>
          <h1>
            Feed
            <br />
            <em>experimental</em>
          </h1>
          <p>Você vai entrar em um feed onde suas escolhas têm consequências.</p>
          <div className="experimental-intro-copy">
            <span>OBSERVE.</span>
            <span>DECIDA.</span>
            <span>DEPOIS, VÁ ALÉM.</span>
          </div>
          <button type="button" onClick={start} className="experimental-primary-action">
            ENTRAR NO FEED <ArrowRight size={18} aria-hidden="true" />
          </button>
          <span className="label-mono experimental-duration">
            {total} CENÁRIOS · EXPERIÊNCIA INTERATIVA · APROX. 5 MIN
          </span>
        </div>
      </div>
    );
  }

  if (stage === "reflection") {
    const shares = decisions.filter(({ action }) =>
      ["share", "repost", "publish"].includes(action),
    ).length;
    const context = decisions.filter(({ action }) =>
      ["verify", "ask", "authority", "report", "ignore", "edit"].includes(action),
    ).length;
    const highRiskChoices = decisions.filter(
      ({ risk, action }) => risk === "high" && ["share", "repost", "publish"].includes(action),
    ).length;
    return (
      <div className="experimental-shell experimental-reflection">
        <div className="experimental-reflection-inner">
          <span className="label-mono text-primary">ATO 04 · IR ALÉM DO FEED</span>
          <h1>
            Você controla
            <br />
            <em>o clique.</em>
          </h1>
          <p className="experimental-reflection-lead">Não necessariamente o que vem depois.</p>
          <div className="experimental-trace-summary">
            <span className="label-mono">SEU RASTRO DIGITAL</span>
            <strong>Você tomou {decisions.length} decisões.</strong>
            <p>
              {shares} envolveram publicação ou compartilhamento. {context} envolveram verificação,
              cuidado ou contexto.
              {highRiskChoices > 0
                ? ` ${highRiskChoices} delas foram em cenários de maior risco jurídico.`
                : ""}
            </p>
          </div>
          <div className="experimental-reflection-layers">
            <span>IMAGEM</span>
            <span>PRIVACIDADE</span>
            <span>HONRA</span>
            <span>CONSENTIMENTO</span>
            <span>RESPONSABILIDADE</span>
          </div>
          <div className="experimental-reflection-actions">
            <Link to="/leis" className="experimental-primary-action">
              VER O QUE A LEI DIZ <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/episodios" className="experimental-secondary-action">
              OUVIR O PODCAST
            </Link>
            <button type="button" onClick={reset} className="experimental-reset">
              <RotateCcw size={15} aria-hidden="true" /> RECOMEÇAR
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="experimental-shell experimental-stage">
      <header className="experimental-stage-header">
        <Link to="/" className="label-mono">
          ← SAIR DA EXPERIÊNCIA
        </Link>
        <span className="label-mono">
          ADF FEED SYSTEM · CENÁRIO {String(scenarioIndex + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
        <span className="label-mono">{decisions.length} DECISÕES</span>
      </header>
      <div className="experimental-progress-track" aria-hidden="true">
        <div className="experimental-progress-fill" style={{ width: `${progressPct}%` }} />
      </div>
      <div className="experimental-stage-intro">
        <Tag tone={currentScenario.type === "minor" ? "coral" : "cobalt"}>
          {currentScenario.type === "minor"
            ? "PROTEÇÃO ESPECIAL"
            : `ATO ${stage === "feed" ? "02" : "03"}`}
        </Tag>
        <h1>{stage === "feed" ? "Você faz uma escolha." : "Agora vamos além do feed."}</h1>
        <p>
          {stage === "feed"
            ? "O feed é a superfície. O que você faz com ela também importa."
            : "O que parecia apenas um clique envolvia mais camadas."}
        </p>
      </div>
      {stage === "feed" ? (
        <ExperimentalPost scenario={currentScenario} onChoose={handleDecision} />
      ) : (
        <section className="experimental-reveal-wrap">
          <div className="experimental-chosen">
            <span className="label-mono">VOCÊ ESCOLHEU</span>
            <strong>{lastAction ? actionLabels[lastAction].toUpperCase() : "UMA AÇÃO"}</strong>
            <p>
              Foi rápido, não foi? Agora imagine que não era um cenário fictício. Era você. Ou
              alguém que aparece na publicação.
            </p>
          </div>
          <figure className="experimental-climax-art">
            <img
              src={feedRuptureClimax}
              alt="Uma moldura aberta se rompe em ondas, fragmentos e conexões, representando a circulação de uma publicação para além do feed."
              width={1536}
              height={1024}
              loading="lazy"
            />
            <figcaption className="label-mono">CAMADA 02 · O CONTEÚDO SAIU DO FRAME</figcaption>
          </figure>
          <div className="experimental-consequence">
            <div className="experimental-consequence-head">
              <span className="label-mono text-coral">O QUE ACONTECEU?</span>
              <Tag tone={riskTone[currentScenario.consequence.risk]}>
                {riskLabel[currentScenario.consequence.risk]}
              </Tag>
            </div>
            <h2>{currentScenario.consequence.headline}</h2>
            <p>{currentScenario.consequence.summary}</p>
            <p className="text-muted-foreground">{currentScenario.consequence.context}</p>
            <div className="flex flex-wrap gap-2">
              {currentScenario.consequence.legalTopics.map((topic) => (
                <Tag key={topic} tone="outline">
                  {topic}
                </Tag>
              ))}
            </div>
          </div>
          <ExperimentalDomino action={lastAction ?? "ignore"} />
          <div className="experimental-layers">
            <span className="label-mono">CAMADAS DA PUBLICAÇÃO</span>
            {currentScenario.layers.map((layer) => (
              <article key={layer.label}>
                <span className="label-mono text-primary">{layer.label}</span>
                <h3>{layer.title}</h3>
                <p>{layer.body}</p>
              </article>
            ))}
          </div>
          {currentScenario.sources?.length ? (
            <div className="experimental-sources">
              <span className="label-mono">FUNDAMENTO · FONTES OFICIAIS</span>
              {currentScenario.sources.map((source) => (
                <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.label} ↗
                </a>
              ))}
            </div>
          ) : null}
          <button
            type="button"
            onClick={next}
            className="experimental-primary-action experimental-next"
          >
            {scenarioIndex === total - 1 ? "VER SEU RASTRO" : "PRÓXIMO CENÁRIO"}{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </section>
      )}
      {stage === "feed" ? (
        <p className="experimental-disclaimer">
          Experiência fictícia e educativa. A análise jurídica depende do caso concreto e não
          substitui orientação profissional.
        </p>
      ) : null}
    </div>
  );
}
