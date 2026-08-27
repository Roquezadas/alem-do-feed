import { Heart, MessageCircle, MoreHorizontal, Repeat2, Send } from "lucide-react";
import type { ExperimentalScenario, FeedAction } from "@/data/types";
import { ExperimentalActionChoice } from "@/components/ExperimentalActionChoice";

const formatMetric = (value: number) => value.toLocaleString("pt-BR");
const contentNotes: Record<ExperimentalScenario["type"], string> = {
  video: "reprodução interrompida · conteúdo sensível",
  photo: "registro de evento · pessoa identificável",
  screenshot: "conversa privada · dados visíveis",
  meme: "imagem editada · contexto em disputa",
  minor: "imagem identificável · proteção especial",
  deepfake: "origem não verificada · imagem manipulada",
};

export function ExperimentalPost({
  scenario,
  onChoose,
  disabled = false,
}: {
  scenario: ExperimentalScenario;
  onChoose: (action: FeedAction) => void;
  disabled?: boolean;
}) {
  return (
    <article className={`experimental-post experimental-post-${scenario.type}`}>
      <header className="experimental-post-header">
        <span className="experimental-avatar" aria-hidden="true">
          {scenario.profile.slice(1, 3).toUpperCase()}
        </span>
        <div>
          <strong>{scenario.profile}</strong>
          <span className="label-mono">{scenario.timestamp} · ADF FEED SYSTEM</span>
        </div>
        <MoreHorizontal aria-hidden="true" size={20} />
      </header>
      <div className="experimental-post-context">
        <span className="label-mono">{scenario.contentLabel}</span>
        <p>{scenario.title}</p>
        <p className="text-muted-foreground">{scenario.description}</p>
      </div>
      <div className="experimental-content-frame">
        <div className="experimental-content-back" aria-hidden="true" />
        <span className="label-mono">
          {scenario.type === "minor" ? "PROTEÇÃO ESPECIAL" : "CAMADA 01 · SUPERFÍCIE"}
        </span>
        <strong>
          {scenario.type === "deepfake"
            ? "ISSO ACONTECEU?"
            : scenario.type === "screenshot"
              ? "VOCÊ LEU."
              : "VOCÊ VIU."}
        </strong>
        <small>{contentNotes[scenario.type]}</small>
      </div>
      <div className="experimental-metrics" aria-label="Métricas fictícias da publicação">
        <span>
          <Heart size={16} aria-hidden="true" /> {formatMetric(scenario.metrics.likes)}
        </span>
        <span>
          <MessageCircle size={16} aria-hidden="true" /> {formatMetric(scenario.metrics.comments)}
        </span>
        <span>
          <Repeat2 size={16} aria-hidden="true" /> {formatMetric(scenario.metrics.shares)}
        </span>
        <span className="label-mono">métricas narrativas</span>
      </div>
      <p className="experimental-caption">“{scenario.description}”</p>
      <div className="experimental-post-tools" aria-hidden="true">
        <Heart size={18} />
        <MessageCircle size={18} />
        <Send size={18} />
      </div>
      <div className="experimental-choice-block">
        <span className="label-mono text-primary">VOCÊ FAZ A ESCOLHA</span>
        <h2>O que você faz?</h2>
        <div className="experimental-actions">
          {scenario.actions.map((item) => (
            <ExperimentalActionChoice
              key={item.id}
              action={item.id}
              label={item.label}
              onChoose={onChoose}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
