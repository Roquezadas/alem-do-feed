import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { CaseCard } from "@/components/cards/CaseCard";
import { LawCard } from "@/components/cards/LawCard";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { episodes, getEpisode } from "@/data/episodes";
import { getLaw } from "@/data/laws";
import { cases } from "@/data/cases";

export const Route = createFileRoute("/episodios/$slug")({
  loader: ({ params }) => getEpisode(params.slug),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.number} ${loaderData.title} — Além do Feed` : "Episódio — Além do Feed" },
      { name: "description", content: loaderData?.description ?? "Episódio do Além do Feed." },
    ],
  }),
  notFoundComponent: () => <p className="p-8">Episódio não encontrado.</p>,
  component: Page,
});

function Page() {
  const episode = Route.useLoaderData();
  if (!episode) return null;
  const relatedLaws = episode.lawIds.map(getLaw).filter(Boolean);
  const relatedCases = cases.filter((item) => episode.caseIds.includes(item.id));

  return (
    <>
      <Section dark label={episode.number} title={episode.title} intro={episode.subtitle}>
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          {episode.coverImage ? <img src={episode.coverImage} alt={`Capa de ${episode.title}`} className="w-full border" /> : null}
          <div>
            <p className="max-w-xl text-lg leading-relaxed opacity-85">{episode.description}</p>
            <div id="player" className="mt-8"><YouTubeEmbed videoId={episode.youtubeId} title={episode.title} fallbackUrl={episode.instagramUrl} /></div>
          </div>
        </div>
      </Section>
      <Section label="ROTEIRO" title="O que atravessamos">
        <ol className="grid gap-3 md:grid-cols-2">
          {episode.topics.map((topic, index) => <li key={topic} className="border-b border-dashed py-4"><span className="label-mono mr-4 text-primary">0{index + 1}</span>{topic}</li>)}
        </ol>
      </Section>
      <Section label="CAMADAS RELACIONADAS" title="A lei e os tribunais">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">{relatedLaws.slice(0, 3).map((law) => law ? <LawCard key={law.id} law={law} /> : null)}</div>
          <div className="space-y-4">{relatedCases.map((item) => <CaseCard key={item.id} item={item} />)}</div>
        </div>
        <Link to="/episodios" className="label-mono mt-8 inline-block border-b border-primary pb-1 text-primary">VOLTAR AOS EPISÓDIOS</Link>
      </Section>
    </>
  );
}

export function getStaticPaths() {
  return episodes.map((episode) => ({ params: { slug: episode.slug } }));
}
