import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import heroLayers from "@/assets/hero-layers.jpg";
import { OpenFrame } from "@/components/OpenFrame";

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
            {beyond ? "O QUE EXISTE ALÉM" : "O QUE VOCÊ VÊ"}
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
            <h2 className="mt-4 text-5xl leading-[0.85] font-extrabold tracking-tighter uppercase md:text-8xl">
              Quem
              <br />
              autorizou?
            </h2>
          </OpenFrame>

          <p className="mt-8 max-w-md text-lg leading-relaxed opacity-85">
            Nem tudo que aparece no feed termina no feed. Uma foto pode parecer só uma foto, até
            você descobrir o que existe por trás dela.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/episodios/$slug"
              params={{ slug: "quem-autorizou" }}
              className="label-mono bg-primary px-6 py-4 text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              ENTRAR NO EPISÓDIO →
            </Link>
            <Link
              to="/o-que-pode-fazer"
              className="editorial-link label-mono border border-current px-6 py-4"
            >
              ABRIR CONTEXTO →
            </Link>
          </div>
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
