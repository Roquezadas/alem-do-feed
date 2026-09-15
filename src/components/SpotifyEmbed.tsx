import { useState } from "react";
import { Headphones } from "lucide-react";

/** Nenhuma conexão com o Spotify até o visitante pedir o player. */
export function SpotifyEmbed({
  episodeId,
  title,
  url,
}: {
  episodeId: string;
  title: string;
  url: string;
}) {
  const [active, setActive] = useState(false);

  return (
    <div>
      <div className="spotify-player">
        {active ? (
          <iframe
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
            onClick={() => setActive(true)}
            aria-label={`Carregar player do Spotify: ${title}`}
            className="flex h-full w-full flex-col items-center justify-center gap-3 px-4 text-center"
          >
            <Headphones size={26} aria-hidden="true" />
            <span className="label-mono">CARREGAR PLAYER DO SPOTIFY →</span>
            <span className="text-xs text-white/75">Ao carregar, você se conecta ao Spotify.</span>
          </button>
        )}
      </div>
      <p className="mt-3 text-sm text-white/75">
        Prefere abrir no aplicativo?{" "}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline underline-offset-4"
        >
          Ouvir no Spotify ↗
        </a>
      </p>
    </div>
  );
}
