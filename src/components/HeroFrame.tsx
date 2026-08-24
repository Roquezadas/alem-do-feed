import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import heroLayers from "@/assets/hero-layers.jpg";

export function HeroFrame() {
  const [beyond, setBeyond] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setBeyond(true), 1400);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section className="surface-dark relative overflow-hidden px-4 pt-14 pb-20 md:px-8 md:pt-20 md:pb-28">
      <div
        className="grid-paper pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.15fr_1fr] md:items-center">
        <div>
          <p className="label-mono text-[oklch(0.703_0.176_26)]">
            {beyond ? "O QUE EXISTE ALÉM" : "O QUE VOCÊ VÊ"}
          </p>

          <h1 className="mt-5 max-w-xl font-display text-5xl leading-[0.86] font-extrabold tracking-tight uppercase md:text-8xl">
            Além do Feed
          </h1>

          <div
            className="mt-8 inline-block border p-6 transition-transform duration-700 md:p-10"
            style={{ transform: beyond ? "translate3d(10px,-10px,0)" : "none" }}
            onMouseEnter={() => setBeyond(true)}
          >
            <span className="label-mono opacity-60">EP. 01 · DIREITO À IMAGEM</span>
            <h2 className="mt-4 text-5xl leading-[0.85] font-extrabold tracking-tighter uppercase md:text-8xl">
              Quem
              <br />
              autorizou?
            </h2>
          </div>

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
            <Link to="/o-que-pode-fazer" className="label-mono border border-current px-6 py-4">
              EXPLORAR O TEMA
            </Link>
          </div>
        </div>

        <div className="relative">
          <img
            src={heroLayers}
            alt="Camadas de molduras sobrepostas em que uma imagem escapa do enquadramento"
            width={1200}
            height={1408}
            className="w-full border object-cover"
          />
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
        </div>
      </div>
    </section>
  );
}
