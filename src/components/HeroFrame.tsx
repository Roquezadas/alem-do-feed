import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import heroLayers from "@/assets/hero-layers.jpg";
import { OpenFrame } from "@/components/OpenFrame";
import { social } from "@/data/social";

export function HeroFrame() {
  const [beyond, setBeyond] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const t = window.setTimeout(() => setBeyond(true), 1400);
    const onScroll = () => {
      const progress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
      setScrollProgress(progress);
      if (progress > 0.08) setBeyond(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="hero-frame surface-dark relative overflow-hidden px-4 pt-16 pb-24 md:px-8 md:pt-24 md:pb-36">
      <div
        className="hero-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />
      <div
        className="grid-paper pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      />

      <span className="hero-oversize" aria-hidden="true">
        FEED
      </span>
      <div className="relative mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.08fr_0.92fr] md:items-center">
        <div>
          <p className="label-mono text-[oklch(0.703_0.176_26)]">
            JÁ ESTAMOS NO AR / EP. 01 NO SPOTIFY
          </p>

          <h1 className="reveal-mask hero-title mt-5 max-w-xl font-display text-6xl leading-[0.78] font-extrabold tracking-[-0.075em] uppercase md:text-8xl lg:text-[clamp(5.5rem,10vw,10rem)]">
            Além do Feed
          </h1>

          <OpenFrame
            variant="media"
            orientation="top-right"
            animated
            className="hero-episode mt-10 inline-block p-6 md:p-10"
            style={{
              transform: `translate3d(${10 + scrollProgress * 8}px,${-10 - scrollProgress * 8}px,0)`,
            }}
            onMouseEnter={() => setBeyond(true)}
          >
            <span className="label-mono opacity-60">EP. 01 · DIREITO À IMAGEM</span>
            <h2 className="mt-4 text-4xl leading-[0.85] font-extrabold tracking-tighter uppercase sm:text-5xl md:text-[clamp(2.5rem,5.5vw,5rem)]">
              Quem
              <br />
              autorizou?
            </h2>
          </OpenFrame>

          <p className="mt-8 max-w-md text-lg leading-relaxed opacity-85">
            O primeiro episódio já está disponível. Ouça “Quem autorizou?” e descubra o que existe
            além de uma publicação. Nem tudo que aparece no feed termina no feed.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={social.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="label-mono bg-primary px-6 py-4 text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              OUVIR NO SPOTIFY ↗
            </a>
            <Link
              to="/episodios/$slug"
              params={{ slug: "quem-autorizou" }}
              className="editorial-link label-mono border border-current px-6 py-4"
            >
              EXPLORAR O EPISÓDIO →
            </Link>
          </div>
          <a
            href={social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="label-mono mt-6 inline-block border-b border-white/50 py-2 text-white"
          >
            ACOMPANHE NO INSTAGRAM ↗
          </a>
        </div>

        <div className="relative hero-media-wrap">
          <OpenFrame
            variant="media"
            orientation="bottom-left"
            animated
            className="hero-media-frame"
          >
            <img
              src={heroLayers}
              alt="Camadas de molduras sobrepostas em que uma imagem escapa do enquadramento"
              width={1200}
              height={1408}
              className="hero-image w-full object-cover"
              style={{ transform: `scale(${1 + scrollProgress * 0.035})` }}
            />
          </OpenFrame>
          <div
            className="absolute -bottom-6 -left-2 max-w-[80%] border bg-[oklch(0.955_0.014_88)] p-4 text-[oklch(0.185_0.005_275)] transition-all duration-700 md:-left-10"
            style={{
              opacity: beyond ? 1 : 0,
              transform: beyond ? "none" : "translate3d(0,12px,0)",
            }}
          >
            <span className="label-mono text-primary">CAMADA OCULTA</span>
            <p className="mt-2 text-sm leading-relaxed">
              Contexto · Lei · Jurisprudência · Risco · Consequência
            </p>
          </div>
          <span className="hero-side-note label-mono" aria-hidden="true">
            SUPERFÍCIE / 001
          </span>
        </div>
      </div>
    </section>
  );
}
