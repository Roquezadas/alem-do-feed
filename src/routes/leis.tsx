import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { LawCard } from "@/components/cards/LawCard";
import { laws, lawCategories } from "@/data/laws";

const title = "O que a lei diz? — Além do Feed";
const description =
  "Constituição, Código Civil, Código Penal, LGPD, Marco Civil da Internet, ECA e Lei de Direitos Autorais aplicados às publicações em redes sociais.";

export const Route = createFileRoute("/leis")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/leis" },
    ],
    links: [{ rel: "canonical", href: "/leis" }],
  }),
  component: Page,
});

function Page() {
  const [filter, setFilter] = useState<string>("TUDO");
  const visible = filter === "TUDO" ? laws : laws.filter((l) => l.category === filter);

  return (
    <Section
      label="LEGISLAÇÃO"
      title="O que a lei diz?"
      intro="Textos legais, instrumentos processuais e uma proposta legislativa, sempre separados por status e com link para a fonte oficial. Projeto de lei não é direito vigente."
    >
      <div className="flex flex-wrap gap-2">
        {["TUDO", ...lawCategories].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={`label-mono border px-3 py-3 ${
              filter === c ? "border-foreground bg-foreground text-background" : "border-border"
            }`}
          >
            {c.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((l) => (
          <LawCard key={l.id} law={l} />
        ))}
      </div>
    </Section>
  );
}
