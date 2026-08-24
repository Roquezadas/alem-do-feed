import { useState } from "react";
import { Tag } from "@/components/Tag";
import { questions } from "@/data/questions";
import { statusLabel } from "@/data/questions";
import type { Question } from "@/data/types";

const storyQuestions = questions.slice(0, 4);

function StoryDetail({ item }: { item: Question }) {
  return (
    <div className="story-answer animate-rise">
      <div className="story-answer-layer">
        <span className="label-mono text-primary">CONTEXTO</span>
        <p>{item.shortAnswer}</p>
      </div>
      <div className="story-answer-layer">
        <span className="label-mono text-primary">DIREITO</span>
        <p>{item.reasoning}</p>
      </div>
      <div className="story-answer-layer border-primary">
        <span className="label-mono text-coral">CONSEQUÊNCIA</span>
        <p>
          {item.status === "risco"
            ? "A publicação pode abrir uma frente de responsabilização. Pare, revise o contexto e considere pedir autorização."
            : "O contexto decide. Quanto mais identificável e exposta a pessoa, maior o cuidado antes de publicar."}
        </p>
      </div>
    </div>
  );
}

export function QuestionStory() {
  const [active, setActive] = useState(0);
  const item = storyQuestions[active];

  return (
    <div className="story-grid">
      <div className="story-nav" aria-label="Perguntas da história">
        {storyQuestions.map((question, index) => (
          <button
            key={question.id}
            type="button"
            className={`story-question ${active === index ? "story-question-active" : ""}`}
            onClick={() => setActive(index)}
            aria-current={active === index ? "step" : undefined}
          >
            <span className="label-mono">0{index + 1}</span>
            <span>{question.question}</span>
          </button>
        ))}
      </div>
      <div className="story-panel frame-open">
        <div className="story-panel-back" aria-hidden="true" />
        <div className="flex items-start justify-between gap-4">
          <Tag tone={item.status === "risco" ? "coral" : "cobalt"}>{statusLabel[item.status]}</Tag>
          <span className="label-mono text-muted-foreground">CAMADA 0{active + 1} / 04</span>
        </div>
        <h3 className="mt-8 max-w-lg font-display text-3xl leading-[0.95] font-extrabold uppercase md:text-5xl">
          {item.question}
        </h3>
        <StoryDetail item={item} />
      </div>
    </div>
  );
}
