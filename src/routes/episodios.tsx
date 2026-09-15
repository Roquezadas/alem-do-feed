import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { EpisodeCard } from "@/components/cards/EpisodeCard";
import { episodes } from "@/data/episodes";

export const Route = createFileRoute("/episodios")({
  head: () => ({
    meta: [
      { title: "Episódios — EP. 01 já no Spotify | Além do Feed" },
      {
        name: "description",
        content:
          "Ouça Quem autorizou?, primeiro episódio do Além do Feed, já disponível no Spotify. Direito à imagem nas redes sociais.",
      },
      { property: "og:title", content: "EP. 01 — Quem autorizou? Já no Spotify" },
      {
        property: "og:description",
        content:
          "O primeiro episódio do Além do Feed está no ar. Ouça e explore as evidências da conversa.",
      },
    ],
    links: [{ rel: "canonical", href: "/episodios" }],
  }),
  component: Page,
});

function Page() {
  const location = useLocation();
  if (location.pathname !== "/episodios") return <Outlet />;

  return (
    <>
      <section className="episodes-hero surface-dark px-4 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <span className="label-mono text-coral">PODCAST / PRIMEIRA EDIÇÃO NO AR</span>
          <h1 className="mt-6 max-w-5xl text-5xl leading-[0.82] font-extrabold tracking-[-0.07em] uppercase md:text-8xl">
            Histórias que começam no feed
            <br />
            <span className="text-white/55">e vão além dele.</span>
          </h1>
        </div>
      </section>
      <Section
        label="EPISÓDIO DISPONÍVEL"
        title="Comece por: quem autorizou?"
        intro="Nosso primeiro episódio já está no Spotify. Ouça a conversa e aprofunde o tema nas leis e nos casos reunidos aqui."
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
