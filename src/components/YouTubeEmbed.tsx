import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  videoId?: string;
  title: string;
  aspectRatio?: "16/9" | "9/16" | "4/3";
  fallbackUrl?: string;
  className?: string;
}

/**
 * Player oficial do YouTube, carregado apenas sob clique (lazy).
 * Se o vídeo não estiver disponível ou não permitir incorporação,
 * o componente cai no fallback com link externo.
 */
export function YouTubeEmbed({
  videoId,
  title,
  aspectRatio = "16/9",
  fallbackUrl,
  className,
}: Props) {
  const [active, setActive] = useState(false);

  if (!videoId) {
    return (
      <div
        className={cn(
          "frame-open flex flex-col items-center justify-center gap-3 p-8 text-center",
          className,
        )}
        style={{ aspectRatio }}
      >
        <span className="label-mono text-muted-foreground">EPISÓDIO EM PRODUÇÃO</span>
        <p className="max-w-sm text-sm text-muted-foreground">
          O vídeo ainda não foi publicado. Assim que estiver no ar, o player oficial aparece aqui.
        </p>
        {fallbackUrl ? (
          <a
            href={fallbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="label-mono border-b border-primary pb-0.5 text-primary"
          >
            VER NO YOUTUBE →
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn("frame-open overflow-hidden", className)} style={{ aspectRatio }}>
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group relative h-full w-full"
          aria-label={`Reproduzir vídeo: ${title}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt={`Capa do vídeo ${title}`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-foreground/40 transition-colors group-hover:bg-foreground/25">
            <span className="label-mono bg-primary px-4 py-3 text-primary-foreground">
              ASSISTIR →
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
