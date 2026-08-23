import { Link } from "@tanstack/react-router";
import { Tag } from "@/components/Tag";
import type { Episode } from "@/data/types";

export function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <article className="frame-open flex flex-col overflow-hidden transition-shadow hover:shadow-[8px_8px_0_0_var(--color-primary)]">
      <div className="flex items-center justify-between border-b border-dashed px-5 py-3">
        <span className="label-mono text-primary">{episode.number}</span>
        <span className="label-mono text-muted-foreground">{episode.duration}</span>
      </div>

      {episode.coverImage ? (
        <img
          src={episode.coverImage}
          alt={`Arte de capa do episódio ${episode.number}: ${episode.title}`}
          loading="lazy"
          width={1200}
          height={912}
          className="aspect-[4/3] w-full object-cover"
        />
      ) : null}

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-2xl leading-none font-extrabold tracking-tight">{episode.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{episode.subtitle}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {episode.tags.map((t) => (
            <Tag key={t} tone="outline">
              {t}
            </Tag>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          <Link
            to="/episodios/$slug"
            params={{ slug: episode.slug }}
            className="label-mono bg-primary px-4 py-3 text-primary-foreground"
          >
            VER ANÁLISE →
          </Link>
          <Link
            to="/episodios/$slug"
            params={{ slug: episode.slug }}
            hash="player"
            className="label-mono border border-foreground px-4 py-3"
          >
            OUVIR
          </Link>
        </div>
      </div>
    </article>
  );
}
