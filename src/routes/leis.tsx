import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { LawCard } from "@/components/cards/LawCard";
import { laws, lawCategories } from "@/data/laws";
import { Link } from "@tanstack/react-router";

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
    <>
      <section className="legal-hero surface-dark px-4 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <span className="label-mono text-primary">ARQUIVO 001 / LEGISLAÇÃO</span>
          <h1 className="mt-6 max-w-5xl text-5xl leading-[0.82] font-extrabold tracking-[-0.07em] uppercase md:text-8xl">
            A lei não aparece no post.
            <br />
            <span className="text-white/55">Mas aparece depois.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-white/70">
            Cada texto abaixo abre quatro camadas: a superfície, o que protege, como aparece no
            digital e a conexão que continua na Sala de Evidências.
          </p>
        </div>
      </section>
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

        <div className="legal-editions mt-10">
          {visible.map((l, index) => (
            <div key={l.id} className={index === 0 ? "legal-edition-feature" : ""}>
              <span className="legal-edition-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <LawCard law={l} />
            </div>
          ))}
        </div>
        <Link
          to="/sala-de-evidencias"
          className="label-mono mt-10 inline-block border-b border-primary pb-1 text-primary"
        >
          SEGUIR A EVIDÊNCIA →
        </Link>
      </Section>
    </>
  );
}
