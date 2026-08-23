import { Tag } from "@/components/Tag";
import type { SocialPost } from "@/data/types";

/**
 * Opção A: se `embeddable` e houver videoId, usa embed oficial.
 * Opção B (padrão): card editorial com link para a plataforma.
 * Opção C: os itens vêm de `src/data/feed.ts` e podem migrar para um banco.
 */
export function SocialCard({ post }: { post: SocialPost }) {
  const platformLabel = post.platform === "instagram" ? "INSTAGRAM" : post.platform.toUpperCase();

  if (post.embeddable && post.platform === "youtube" && post.videoId) {
    return (
      <div className="frame-open overflow-hidden">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${post.videoId}?rel=0`}
          title={post.caption}
          loading="lazy"
          allowFullScreen
          className="aspect-[9/16] w-full"
        />
      </div>
    );
  }

  return (
    <article className="frame-open flex flex-col p-5">
      <div className="flex items-center justify-between">
        <Tag tone="ink">{platformLabel}</Tag>
        <span className="label-mono text-muted-foreground">{post.kind.toUpperCase()}</span>
      </div>

      <div
        className="grid-paper mt-4 flex aspect-[4/5] items-end p-4 text-muted-foreground"
        aria-hidden="true"
      >
        <span className="label-mono">O FEED MOSTRA.</span>
      </div>

      <p className="mt-4 text-sm leading-relaxed">{post.caption}</p>
      <time className="label-mono mt-3 text-muted-foreground" dateTime={post.date}>
        {new Date(post.date).toLocaleDateString("pt-BR")}
      </time>

      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="label-mono mt-4 self-start border-b border-primary pb-1 text-primary"
      >
        {post.platform === "instagram" ? "VER NO INSTAGRAM →" : "VER NO YOUTUBE →"}
      </a>
    </article>
  );
}
