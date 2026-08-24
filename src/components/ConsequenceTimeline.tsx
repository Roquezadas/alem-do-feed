const steps = [
  { label: "POSTOU", text: "Uma publicação entra no ar." },
  { label: "COMPARTILHOU", text: "O alcance deixa de estar sob seu controle." },
  { label: "VIRALIZOU", text: "Novos públicos criam novos contextos." },
  { label: "APAGOU", text: "A publicação some. As cópias, não." },
  { label: "CONTINUOU", text: "O que circulou pode continuar sendo prova e consequência." },
];

export function ConsequenceTimeline() {
  return (
    <ol className="consequence-timeline">
      {steps.map((step, index) => (
        <li key={step.label} className="consequence-step">
          <div className="consequence-marker" aria-hidden="true">
            <span>{String(index + 1).padStart(2, "0")}</span>
          </div>
          <div>
            <span className="label-mono text-coral">{step.label}</span>
            <p className="mt-2 max-w-xs text-sm leading-relaxed opacity-80">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
