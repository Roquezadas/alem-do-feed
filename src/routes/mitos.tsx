import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { MythCard } from "@/components/cards/MythCard";
import { myths } from "@/data/myths";

const title = "Mitos do feed — Além do Feed";
const description =
  "“Se está na internet, posso usar”, “se eu der crédito, posso repostar”: os mitos mais repetidos sobre publicar conteúdo de outras pessoas.";

export const Route = createFileRoute("/mitos")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/mitos" },
    ],
    links: [{ rel: "canonical", href: "/mitos" }],
  }),
  component: Page,
});

function Page() {
  return (
    <Section
      label="DESMONTANDO"
      title="Mitos do feed"
      intro="Abra cada card para ver o veredito e a explicação jurídica."
    >
      <div className="myth-editions">
        {myths.map((m, index) => (
          <div key={m.id} className="myth-edition">
            <span className="label-mono text-coral">
              {String(index + 1).padStart(2, "0")} / AFIRMAÇÃO
            </span>
            <MythCard item={m} />
          </div>
        ))}
      </div>
    </Section>
  );
}
