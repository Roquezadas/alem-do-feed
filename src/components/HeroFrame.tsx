import { Link } from "@tanstack/react-router";
import heroArtwork from "@/assets/hero-ep02-isso-e-real-1120.webp";
import heroArtworkSmall from "@/assets/hero-ep02-isso-e-real-640.webp";
import { social } from "@/data/social";
import { latestEpisode } from "@/data/episodes";

export function HeroFrame() {
  return (
    <section className="hero-frame hero-human surface-dark" aria-labelledby="hero-human-title">
      <div className="hero-human-grid">
        <div className="hero-human-intro">
          <p className="label-mono text-coral">ALÉM DO FEED / O PODCAST JÁ ESTÁ NO AR</p>
          <h1 id="hero-human-title" className="hero-human-title">
            Antes de ser
            <br />
            conteúdo,
            <br />
            <span>era alguém.</span>
          </h1>
          <p className="hero-human-deck">
            Uma imagem pode parecer só um registro. Real ou fabricada, quando vira publicação,
            entram em cena pessoas, direitos e consequências.
          </p>
        </div>

        <figure className="hero-human-figure">
          <img
            src={heroArtwork}
            srcSet={`${heroArtworkSmall} 640w, ${heroArtwork} 1120w`}
            sizes="(min-width: 1280px) 592px, (min-width: 960px) 47vw, (min-width: 640px) 560px, calc(100vw - 32px)"
            alt="Arte editorial do EP. 02 — Isso é real?: o rosto de uma mulher aparece sobreposto a uma segunda versão, atravessado por linhas azuis. Deepfakes, inteligência artificial e identidade digital."
            width={1120}
            height={1400}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="hero-human-image"
          />
          <figcaption className="hero-human-art-caption label-mono">
            COMPOSIÇÃO EDITORIAL / {latestEpisode.number} — {latestEpisode.title}
          </figcaption>
        </figure>

        <div className="hero-human-listen">
          <div className="hero-human-episode">
            <span className="label-mono text-coral">{latestEpisode.number} / NOVO EPISÓDIO</span>
            <h2>{latestEpisode.title}</h2>
            <p>{latestEpisode.subtitle}. Já disponível no Spotify.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={latestEpisode.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label-mono bg-primary px-5 py-4 text-primary-foreground"
            >
              OUVIR NO SPOTIFY ↗
            </a>
            <Link
              to="/episodios/$slug"
              params={{ slug: latestEpisode.slug }}
              className="label-mono border border-white/50 px-5 py-4"
            >
              EXPLORAR O EPISÓDIO →
            </Link>
          </div>
          <a
            href={social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="label-mono mt-5 inline-block border-b border-white/50 py-2 text-white"
          >
            ACOMPANHE NO INSTAGRAM ↗
          </a>
        </div>
      </div>
    </section>
  );
}
