import { Link } from "@tanstack/react-router";
import { Tag } from "@/components/Tag";
import type { Episode } from "@/data/types";

export function EpisodeCard({
  episode,
  featured = false,
}: {
  episode: Episode;
  featured?: boolean;
}) {
  return (
    <article
      className={`episode-card frame-open overflow-hidden text-foreground ${featured ? "episode-card-featured" : "flex flex-col"}`}
    >
      {episode.coverImage ? (
        <img
          src={episode.coverImage}
          alt={`Arte de capa do episódio ${episode.number}: ${episode.title}`}
          loading="lazy"
          width={640}
          height={640}
          className="episode-cover aspect-square w-full bg-white object-contain"
        />
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col justify-center p-6 md:p-10">
        <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="label-mono text-primary">{episode.number} · DISPONÍVEL NO SPOTIFY</span>
          <span className="label-mono text-muted-foreground">{episode.duration}</span>
        </div>
        <h3
          className={
            featured
              ? "text-3xl leading-none font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
              : "text-2xl leading-none font-extrabold tracking-tight"
          }
        >
          {episode.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{episode.subtitle}</p>
        {featured ? <p className="mt-5 max-w-xl leading-relaxed">{episode.description}</p> : null}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {episode.tags.map((t) => (
            <Tag key={t} tone="outline">
              {t}
            </Tag>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-8">
          {episode.spotifyUrl ? (
            <a
              href={episode.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label-mono bg-primary px-5 py-4 text-primary-foreground"
            >
              OUVIR NO SPOTIFY ↗
            </a>
          ) : null}
          <Link
            to="/episodios/$slug"
            params={{ slug: episode.slug }}
            className="label-mono border border-foreground px-5 py-4"
          >
            VER ANÁLISE →
          </Link>
        </div>
        {featured && episode.evidenceTopicSlug ? (
          <Link
            to="/sala-de-evidencias"
            search={{ topic: episode.evidenceTopicSlug }}
            className="label-mono mt-6 self-start border-b border-primary py-2 text-primary"
          >
            EXPLORAR AS EVIDÊNCIAS DO EPISÓDIO →
          </Link>
        ) : null}
      </div>
    </article>
  );
}
