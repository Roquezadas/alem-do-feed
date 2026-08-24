import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { EpisodeCard } from "@/components/cards/EpisodeCard";
import { episodes } from "@/data/episodes";

export const Route = createFileRoute("/episodios")({
  head: () => ({
    meta: [
      { title: "Episódios — Além do Feed" },
      { name: "description", content: "Conversas sobre o que existe por trás das publicações." },
    ],
    links: [{ rel: "canonical", href: "/episodios" }],
  }),
  component: Page,
});

function Page() {
  const location = useLocation();
  if (location.pathname !== "/episodios") return <Outlet />;

  return (
    <Section
      label="PODCAST"
      title="Episódios que começam no feed e terminam no fundamento."
      intro="Cada conversa parte de uma situação reconhecível e acompanha suas camadas jurídicas."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {episodes.map((episode) => <EpisodeCard key={episode.id} episode={episode} />)}
        <div className="frame-open grid min-h-48 place-content-center border-dashed p-8 text-center">
          <span className="label-mono text-muted-foreground">PRÓXIMO CAPÍTULO</span>
          <strong className="mt-3 font-display text-2xl uppercase">EP. 02 — O print fica</strong>
          <span className="mt-2 text-sm text-muted-foreground">Intimidade, conversa privada e circulação.</span>
        </div>
      </div>
    </Section>
  );
}
