import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { ShareChain } from "@/components/ShareChain";
import { CaseCard } from "@/components/cards/CaseCard";
import { cases } from "@/data/cases";

const title = "Quem compartilhou? — Além do Feed";
const description =
  "Quem publicou primeiro é sempre o único responsável? A cadeia publicou, repostou, compartilhou, viralizou e a responsabilidade de cada etapa.";

export const Route = createFileRoute("/quem-compartilhou")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/quem-compartilhou" },
    ],
    links: [{ rel: "canonical", href: "/quem-compartilhou" }],
  }),
  component: Page,
});

function Page() {
  const related = cases.filter((c) => ["stj-sumula-221", "stf-re-1037396"].includes(c.id));

  return (
    <>
      <Section
        dark
        label="RESPONSABILIDADE"
        title="Quem compartilhou?"
        intro="Uma publicação raramente tem um único autor de dano. Atravesse a cadeia e veja onde a responsabilidade aparece."
      >
        <ShareChain />
      </Section>

      <Section label="TRIBUNAIS" title="O que sustenta essa leitura">
        <div className="grid gap-4 lg:grid-cols-2">
          {related.map((c) => (
            <CaseCard key={c.id} item={c} />
          ))}
        </div>
      </Section>
    </>
  );
}
