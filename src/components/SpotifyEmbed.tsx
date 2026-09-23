import { useEffect, useRef, useState } from "react";
import { Headphones } from "lucide-react";

type SpotifyEmbedProps = {
  episodeId: string;
  title: string;
  url: string;
};

/** Nenhuma conexão com o Spotify até o visitante pedir o player. */
export function SpotifyEmbed(props: SpotifyEmbedProps) {
  // Navegar para outro episódio encerra o player e os timers anteriores.
  return <Player key={`${props.episodeId}:${props.url}`} {...props} />;
}

function Player({ episodeId, title, url }: SpotifyEmbedProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "loaded" | "fallback">("idle");
  const active = status === "loading" || status === "loaded";

  useEffect(() => {
    const frame = frameRef.current;
    if (!active || !frame) return;
    // O evento error de um iframe não propaga; escutar diretamente no elemento.
    // load confirma só o documento, não a disponibilidade interna do player cross-origin.
    const loaded = () => setStatus("loaded");
    const failed = () => setStatus("fallback");
    frame.addEventListener("load", loaded);
    frame.addEventListener("error", failed);
    return () => {
      frame.removeEventListener("load", loaded);
      frame.removeEventListener("error", failed);
    };
  }, [active]);

  useEffect(() => {
    if (status !== "loading") return;
    const timeout = window.setTimeout(() => setStatus("fallback"), 15000);
    return () => window.clearTimeout(timeout);
  }, [status]);

  return (
    <div className="min-w-0" data-spotify-status={status}>
      <div className="spotify-player">
        {active ? (
          <iframe
            ref={frameRef}
            src={`https://open.spotify.com/embed/episode/${episodeId}?utm_source=oembed`}
            title={`Spotify: ${title}`}
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="block h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setStatus("loading")}
            aria-label={`Carregar player do Spotify: ${title}`}
            className="flex h-full w-full flex-col items-center justify-center gap-3 px-4 text-center"
          >
            <Headphones size={26} aria-hidden="true" />
            <span className="label-mono">
              {status === "fallback"
                ? "TENTAR CARREGAR NOVAMENTE →"
                : "CARREGAR PLAYER DO SPOTIFY →"}
            </span>
            <span className="text-xs text-white/75">
              {status === "fallback"
                ? "O player não respondeu. Você também pode abrir o episódio no Spotify."
                : "Ao carregar, você se conecta ao Spotify."}
            </span>
          </button>
        )}
      </div>
      <p role="status" className="sr-only">
        {status === "loading"
          ? "Carregando player do Spotify."
          : status === "fallback"
            ? "Player indisponível. Use o link direto para ouvir."
            : ""}
      </p>
      <p className="mt-3 text-sm text-white/75">
        Se o player não aparecer, ouça diretamente no Spotify.{" "}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline underline-offset-4"
        >
          Ouvir no Spotify ↗
        </a>
      </p>
      {active ? (
        <button
          type="button"
          className="label-mono mt-3 underline underline-offset-4"
          onClick={() => setStatus("idle")}
        >
          FECHAR PLAYER
        </button>
      ) : null}
    </div>
  );
}
