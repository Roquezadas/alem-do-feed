import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { EpisodeCard } from "@/components/cards/EpisodeCard";
import { episodes, latestEpisode } from "@/data/episodes";

export const Route = createFileRoute("/episodios")({
  head: ({ matches }) => {
    // Esta rota também é o layout dos detalhes. Não emitir um segundo canonical.
    if (matches.at(-1)?.routeId !== "/episodios") return {};
    return {
      meta: [
        { title: "Episódios | Além do Feed" },
        {
          name: "description",
          content: `Ouça os ${episodes.length} episódios do Além do Feed no Spotify. Mais recente: ${latestEpisode.title} — ${latestEpisode.subtitle}.`,
        },
        { property: "og:title", content: "Episódios | Além do Feed" },
        {
          property: "og:description",
          content: `Já no Spotify: ${latestEpisode.number} — ${latestEpisode.title}. Ouça e explore as evidências da conversa.`,
        },
      ],
      links: [{ rel: "canonical", href: "https://alemdofeed.vercel.app/episodios" }],
    };
  },
  component: Page,
});

function Page() {
  const location = useLocation();
  if (location.pathname !== "/episodios") return <Outlet />;

  return (
    <>
      <section className="episodes-hero surface-dark px-4 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <span className="label-mono text-coral">
            PODCAST / {episodes.length} EPISÓDIOS PUBLICADOS
          </span>
          <h1 className="mt-6 max-w-5xl text-5xl leading-[0.82] font-extrabold tracking-[-0.07em] uppercase md:text-8xl">
            Histórias que começam no feed
            <br />
            <span className="text-white/55">e vão além dele.</span>
          </h1>
        </div>
      </section>
      <Section
        label="DO MAIS RECENTE AO PRIMEIRO"
        title="Dê o play. Vá além."
        intro="Do direito à imagem aos deepfakes: ouça as conversas no Spotify e aprofunde cada tema nas camadas do site."
      >
        <div className="grid gap-8">
          {episodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} featured />
          ))}
        </div>
      </Section>
    </>
  );
}
