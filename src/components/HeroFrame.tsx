import { Link } from "@tanstack/react-router";
import heroArtwork from "@/assets/hero-quem-autorizou-publicacao-1120.webp";
import heroArtworkSmall from "@/assets/hero-quem-autorizou-publicacao-640.webp";
import { social } from "@/data/social";

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
            Uma foto pode parecer só um registro. Quando vira publicação, entram em cena contexto,
            consentimento e consequências.
          </p>
        </div>

        <figure className="hero-human-figure">
          <img
            src={heroArtwork}
            srcSet={`${heroArtworkSmall} 640w, ${heroArtwork} 1120w`}
            sizes="(min-width: 1280px) 592px, (min-width: 960px) 47vw, (min-width: 640px) 560px, calc(100vw - 32px)"
            alt="Arte editorial com a foto de uma mulher em um encontro entre amigos, dentro de uma publicação sobreposta a outras. As frases ‘Mais que posts, pessoas reais’ e ‘Quem autorizou?’ destacam a pessoa por trás da imagem."
            width={1120}
            height={1400}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="hero-human-image"
          />
          <figcaption className="hero-human-art-caption label-mono">
            COMPOSIÇÃO EDITORIAL / EP. 01 — QUEM AUTORIZOU?
          </figcaption>
        </figure>

        <div className="hero-human-listen">
          <div className="hero-human-episode">
            <span className="label-mono text-coral">EP. 01 / DIREITO À IMAGEM</span>
            <h2>Quem autorizou?</h2>
            <p>Consentimento, exposição e consequências. Já disponível no Spotify.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={social.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="label-mono bg-primary px-5 py-4 text-primary-foreground"
            >
              OUVIR NO SPOTIFY ↗
            </a>
            <Link
              to="/episodios/$slug"
              params={{ slug: "quem-autorizou" }}
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
