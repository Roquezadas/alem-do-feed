import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Mark } from "@/components/brand/Mark";
import { SearchDialog } from "@/components/SearchDialog";

export const navItems = [
  { to: "/o-que-pode-fazer", label: "O QUE PODE FAZER?" },
  { to: "/entenda", label: "ENTENDA" },
  { to: "/episodios", label: "EPISÓDIOS" },
  { to: "/jurisprudencia", label: "JURISPRUDÊNCIA" },
  { to: "/conteudos", label: "CONTEÚDOS" },
  { to: "/sobre", label: "SOBRE" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2" aria-label="Além do Feed — página inicial">
          <Mark className="h-7 w-7" />
          <span className="font-display text-sm leading-none font-extrabold tracking-tight uppercase">
            Além
            <br />
            do Feed
          </span>
        </Link>

        <nav aria-label="Principal" className="ml-auto hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="label-mono text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "label-mono text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <SearchDialog />
          <Link
            to="/conteudos"
            className="label-mono hidden bg-primary px-4 py-3 text-primary-foreground sm:inline-block"
          >
            IR ALÉM →
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="label-mono border border-foreground px-3 py-3 lg:hidden"
          >
            {open ? "FECHAR" : "MENU"}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="menu-mobile"
          aria-label="Principal (mobile)"
          className="animate-rise border-t bg-background px-4 py-4 lg:hidden"
        >
          <ul className="grid gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="label-mono block border-b border-dashed py-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
