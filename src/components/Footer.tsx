import { Link, useLocation } from "@tanstack/react-router";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { social } from "@/data/feed";

const links = [
  { to: "/feed-experimental", label: "EXPERIÊNCIA" },
  { to: "/o-que-pode-fazer", label: "O QUE PODE FAZER?" },
  { to: "/entenda", label: "ENTENDA" },
  { to: "/leis", label: "LEIS" },
  { to: "/jurisprudencia", label: "STF / STJ" },
  { to: "/episodios", label: "EPISÓDIOS" },
  { to: "/mitos", label: "MITOS DO FEED" },
  { to: "/conteudos", label: "FEED" },
  { to: "/sobre", label: "SOBRE" },
] as const;

export function Footer() {
  const location = useLocation();

  if (location.pathname === "/feed-experimental") return null;

  return (
    <footer className="site-footer surface-dark border-t px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="footer-manifesto" aria-hidden="true">
          O FEED MOSTRA.
          <br />A GENTE VAI <span>ALÉM.</span>
        </div>
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <BrandLogo className="brand-logo-footer" />
            <p className="mt-4 text-sm opacity-75">Nem tudo que aparece no feed termina no feed.</p>
          </div>

          <nav aria-label="Rodapé" className="grid grid-cols-2 gap-x-8 gap-y-3">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="label-mono opacity-75 hover:opacity-100">
                {l.label}
              </Link>
            ))}
          </nav>

          <div>
            <span className="label-mono opacity-60">REDES</span>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono"
                >
                  INSTAGRAM ↗
                </a>
              </li>
              <li>
                <a
                  href={social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono"
                >
                  YOUTUBE ↗
                </a>
              </li>
              <li>
                <a
                  href={social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono"
                >
                  TIKTOK ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-white/15 pt-6 text-xs leading-relaxed opacity-60">
          Conteúdo produzido para fins acadêmicos e educativos. Não constitui aconselhamento
          jurídico individual.
        </p>
      </div>
    </footer>
  );
}
