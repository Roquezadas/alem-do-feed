import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import type { FeedAction } from "@/data/types";

const stages = [
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

export function ExperimentalDomino({ action }: { action: FeedAction }) {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    setVisible(0);
    const timers = stages.map((_, index) =>
      window.setTimeout(() => setVisible(index + 1), 180 + index * 170),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [action]);

  return (
    <div className="experimental-domino" aria-live="polite">
      {stages.map((stage, index) => (
        <div
          key={stage}
          className={`experimental-domino-step ${visible > index ? "is-visible" : ""}`}
        >
          <span className="experimental-domino-node">{String(index + 1).padStart(2, "0")}</span>
          <span className="label-mono">{stage}</span>
          {index < stages.length - 1 ? <ArrowDown size={16} aria-hidden="true" /> : null}
        </div>
      ))}
      <p className="experimental-domino-question">Você ainda controla aquilo que publicou?</p>
    </div>
  );
}
