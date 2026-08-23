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

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {visible.map((c) => (
          <CaseCard key={c.id} item={c} />
        ))}
      </div>
    </Section>
  );
}
