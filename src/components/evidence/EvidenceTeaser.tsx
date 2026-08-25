import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function EvidenceTeaser() {
  return (
    <div className="evidence-teaser">
      <div className="evidence-teaser-copy">
        <p className="label-mono text-primary">SALA DE EVIDÊNCIAS</p>
        <h3 className="mt-4 max-w-2xl text-4xl leading-[0.92] font-extrabold tracking-tight md:text-6xl">
          Uma questão.
          <br />
          Várias conexões.
        </h3>
        <p className="mt-5 max-w-xl text-muted-foreground">
          Conecte uma dúvida a uma lei, um caso e um episódio — e descubra o que existe além da publicação.
        </p>
        <Link
          to="/sala-de-evidencias"
          className="label-mono mt-7 inline-flex items-center gap-2 bg-primary px-5 py-4 text-primary-foreground"
        >
          ENTRAR NA SALA <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="evidence-teaser-map" aria-hidden="true">
        <span className="evidence-teaser-line evidence-teaser-line-a" />
        <span className="evidence-teaser-line evidence-teaser-line-b" />
        <span className="evidence-teaser-line evidence-teaser-line-c" />
        <span className="evidence-teaser-core">DIREITO À IMAGEM</span>
        <span className="evidence-teaser-node evidence-teaser-node-1">LEI</span>
        <span className="evidence-teaser-node evidence-teaser-node-2">CASO</span>
        <span className="evidence-teaser-node evidence-teaser-node-3">EP. 01</span>
      </div>
    </div>
  );
}
