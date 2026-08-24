import { useEffect, useState } from "react";
import { ArrowDown, ShieldCheck } from "lucide-react";
import type { FeedAction } from "@/data/types";

// Ações que alimentam a propagação do conteúdo — a cadeia viral acontece.
const PROPAGATING_ACTIONS: FeedAction[] = ["share", "repost", "publish"];

const propagateStages = [
  "VOCÊ",
  "1 PESSOA",
  "10 PESSOAS",
  "100 PESSOAS",
  "1.000 PESSOAS",
  "VIRALIZOU",
  "PRINT",
  "REPOST",
  "OUTRO PERFIL",
  "FORA DO CONTEXTO",
];

// Ações que interrompem ou contêm a circulação — cadeia curta e específica por ação.
const containStagesByAction: Partial<Record<FeedAction, string[]>> = {
  ignore: ["VOCÊ", "DECISÃO TOMADA", "NADA SAIU DAQUI", "CADEIA NÃO INICIADA"],
  report: ["VOCÊ", "DENÚNCIA ENVIADA", "ANÁLISE DA PLATAFORMA", "CIRCULAÇÃO CONTIDA"],
  verify: ["VOCÊ", "VERIFICAÇÃO", "CONTEXTO CONFIRMADO", "DECISÃO INFORMADA"],
  ask: ["VOCÊ", "PERGUNTA FEITA", "CONSENTIMENTO EM ABERTO", "CADEIA EM PAUSA"],
  authority: ["VOCÊ", "ENCAMINHADO", "AUTORIDADE COMPETENTE", "CIRCULAÇÃO CONTIDA"],
  edit: ["VOCÊ", "CONTEÚDO EDITADO", "PESSOA REMOVIDA DA CENA", "EXPOSIÇÃO REDUZIDA"],
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function ExperimentalDomino({ action }: { action: FeedAction }) {
  const propagates = PROPAGATING_ACTIONS.includes(action);
  const stages = propagates
    ? propagateStages
    : (containStagesByAction[action] ?? ["VOCÊ", "DECISÃO TOMADA", "CADEIA INTERROMPIDA"]);

  const reducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(stages.length);
      return;
    }
    setVisible(0);
    const timers = stages.map((_, index) =>
      window.setTimeout(() => setVisible(index + 1), 180 + index * 170),
    );
    return () => timers.forEach(window.clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, reducedMotion]);

  return (
    <div
      className={`experimental-domino ${propagates ? "is-propagating" : "is-contained"}`}
      aria-live="polite"
    >
      <span className="label-mono experimental-domino-label">
        {propagates ? "COMO O CONTEÚDO SE ESPALHOU" : "O QUE ACONTECEU COM A CADEIA"}
      </span>
      {stages.map((stage, index) => (
        <div
          key={stage}
          className={`experimental-domino-step ${visible > index ? "is-visible" : ""}`}
        >
          <span className="experimental-domino-node">
            {propagates ? (
              String(index + 1).padStart(2, "0")
            ) : index === stages.length - 1 ? (
              <ShieldCheck size={16} aria-hidden="true" />
            ) : (
              String(index + 1).padStart(2, "0")
            )}
          </span>
          <span className="label-mono">{stage}</span>
          {index < stages.length - 1 ? <ArrowDown size={16} aria-hidden="true" /> : null}
        </div>
      ))}
      <p className="experimental-domino-question">
        {propagates
          ? "Você ainda controla aquilo que publicou?"
          : "Nem toda decisão alimenta o efeito dominó."}
      </p>
    </div>
  );
}