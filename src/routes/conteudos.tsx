import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Section } from "@/components/Section";
import { FeedCard } from "@/components/cards/FeedCard";
import { feedFilters, feedItems } from "@/data/feed";

const title = "Feed editorial — Além do Feed";
const description =
  "Conteúdos sobre redes sociais, Direito Digital, imagem, privacidade e responsabilidade.";

export const Route = createFileRoute("/conteudos")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/conteudos" }],
  }),
  component: Page,
});

function Page() {
  const [filter, setFilter] = useState<(typeof feedFilters)[number]>("TUDO");
  const visible =
    filter === "TUDO"
      ? feedItems
      : feedItems.filter((item) => item.tags.some((tag) => tag.toUpperCase() === filter));

  return (
    <Section
      label="FEED EDITORIAL"
      title="O feed mostra. A gente abre a camada."
      intro="Episódios, perguntas, leis e casos para atravessar a superfície de uma publicação."
    >
      <div className="flex gap-2 overflow-x-auto pb-2" aria-label="Filtrar conteúdos">
        {feedFilters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            aria-pressed={filter === item}
            className={`label-mono shrink-0 border px-3 py-3 ${filter === item ? "border-foreground bg-foreground text-background" : "border-border"}`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((item, index) => (
          <div key={item.id} className={index % 5 === 0 ? "md:col-span-2" : ""}>
            <FeedCard item={item} />
          </div>
        ))}
      </div>
    </Section>
  );
}
