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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {myths.map((m) => (
          <MythCard key={m.id} item={m} />
        ))}
      </div>
    </Section>
  );
}
