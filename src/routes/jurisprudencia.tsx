import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { CaseCard } from "@/components/cards/CaseCard";
import { cases } from "@/data/cases";

const title = "O que os tribunais dizem? — Além do Feed";
const description =
  "Decisões do STF e do STJ sobre direito à imagem, privacidade, honra e responsabilidade na internet, explicadas de forma acessível e com fonte oficial.";

export const Route = createFileRoute("/jurisprudencia")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/jurisprudencia" },
    ],
    links: [{ rel: "canonical", href: "/jurisprudencia" }],
  }),
  component: Page,
});

function Page() {
  const [court, setCourt] = useState<"TUDO" | "STF" | "STJ">("TUDO");
  const visible = court === "TUDO" ? cases : cases.filter((c) => c.court === court);

  return (
    <>
      <section className="case-question surface-dark px-4 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <span className="label-mono text-primary">JURISPRUDÊNCIA / ARQUIVO 002</span>
          <h1 className="mt-6 max-w-5xl text-5xl leading-[0.82] font-extrabold tracking-[-0.07em] uppercase md:text-8xl">
            Quando a tela encontra
            <br />
            <span className="text-white/55">o tribunal?</span>
          </h1>
        </div>
      </section>
      <Section
        label="JURISPRUDÊNCIA"
        title="O que os tribunais dizem?"
        intro="Só entram aqui decisões verificáveis, com processo identificado e link para a fonte oficial. Nada de jurisprudência inventada."
      >
        <div className="flex flex-wrap gap-2">
          {(["TUDO", "STF", "STJ"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCourt(c)}
              aria-pressed={court === c}
              className={`label-mono border px-4 py-3 ${
                court === c ? "border-foreground bg-foreground text-background" : "border-border"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="case-editions mt-10">
          {visible.map((c, index) => (
            <div key={c.id} className="case-edition">
              <span className="label-mono text-primary">
                {String(index + 1).padStart(2, "0")} / {c.court}
              </span>
              <CaseCard item={c} />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
