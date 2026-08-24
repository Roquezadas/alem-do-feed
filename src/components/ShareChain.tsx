import { useState } from "react";

const chain = [
  {
    step: "PUBLICOU",
    text: "Quem publica pela primeira vez cria a exposição inicial e responde pelo conteúdo que escolheu divulgar.",
  },
  {
    step: "REPOSTOU",
    text: "O repost gera uma nova publicação, com público próprio. Não é apenas espelhar: é difundir outra vez.",
  },
  {
    step: "COMPARTILHOU",
    text: "Compartilhar amplia o dano. A jurisprudência brasileira conhece bem a lógica de corresponsabilidade entre autor e veículo de divulgação.",
  },
  {
    step: "VIRALIZOU",
    text: "Quando o conteúdo escapa de controle, o pedido de remoção deixa de resolver — e a discussão vira reparação.",
  },
];

export function ShareChain() {
  const [active, setActive] = useState(0);

  return (
    <div>
      <ol className="flex flex-wrap gap-2">
        {chain.map((c, i) => (
          <li key={c.step} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-current={active === i}
              className={`label-mono border px-3 py-3 transition-colors ${
                active === i
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-current/40"
              }`}
            >
              {c.step}
            </button>
            {i < chain.length - 1 ? (
              <span aria-hidden="true" className="label-mono opacity-40">
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>

      <div className="animate-slide-left mt-6 border-l-2 border-accent pl-4" key={active}>
        <span className="label-mono opacity-60">ETAPA {active + 1} DE 4</span>
        <p className="mt-2 max-w-2xl text-base leading-relaxed">{chain[active].text}</p>
      </div>
    </div>
  );
}
