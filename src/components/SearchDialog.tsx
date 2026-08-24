import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tag } from "@/components/Tag";
import { laws } from "@/data/laws";
import { cases } from "@/data/cases";
import { questions } from "@/data/questions";
import { episodes } from "@/data/episodes";
import { topics } from "@/data/topics";

type Result = { id: string; kind: string; title: string; text: string; to: string };

function buildIndex(): Result[] {
  return [
    ...episodes.map((e) => ({
      id: e.id,
      kind: "EPISÓDIO",
      title: `${e.number} — ${e.title}`,
      text: `${e.subtitle} ${e.description} ${e.tags.join(" ")}`,
      to: `/episodios/${e.slug}`,
    })),
    ...questions.map((q) => ({
      id: q.id,
      kind: "PERGUNTA",
      title: q.question,
      text: `${q.shortAnswer} ${q.reasoning} ${q.tags.join(" ")}`,
      to: "/o-que-pode-fazer",
    })),
    ...laws.map((l) => ({
      id: l.id,
      kind: "LEI",
      title: `${l.category} · ${l.article}`,
      text: `${l.title} ${l.summary} ${l.text}`,
      to: "/leis",
    })),
    ...cases.map((c) => ({
      id: c.id,
      kind: c.court,
      title: c.title,
      text: `${c.process} ${c.legalIssue} ${c.decision} ${c.theme}`,
      to: "/jurisprudencia",
    })),
    ...topics.map((t) => ({
      id: t.id,
      kind: "ENTENDA",
      title: t.name,
      text: `${t.definition} ${t.legalBasis} ${t.example}`,
      to: "/entenda",
    })),
  ];
}

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const index = useMemo(buildIndex, []);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (q.length < 2) return [];
    return index
      .filter((r) => normalize(`${r.title} ${r.text} ${r.kind}`).includes(q))
      .slice(0, 12);
  }, [index, query]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button type="button" className="label-mono border border-foreground px-3 py-3">
          BUSCAR
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl rounded-none border-foreground">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl uppercase">Buscar no além</DialogTitle>
          <DialogDescription>
            Pesquise por imagem, print, meme, LGPD, STF, compartilhar e outros termos.
          </DialogDescription>
        </DialogHeader>

        <label htmlFor="busca-global" className="label-mono text-muted-foreground">
          TERMO
        </label>
        <input
          id="busca-global"
          type="search"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="imagem, print, meme, LGPD…"
          className="w-full border border-foreground bg-background px-4 py-3 text-base"
        />

        <ul className="max-h-[50vh] space-y-2 overflow-y-auto">
          {results.map((r) => (
            <li key={`${r.kind}-${r.id}`}>
              <Link
                to={r.to as "/"}
                onClick={() => setOpen(false)}
                className="block border border-dashed p-3 hover:border-primary"
              >
                <Tag tone="outline">{r.kind}</Tag>
                <span className="mt-2 block text-sm font-semibold">{r.title}</span>
              </Link>
            </li>
          ))}
          {query.trim().length >= 2 && results.length === 0 ? (
            <li className="label-mono py-6 text-center text-muted-foreground">
              NADA ENCONTRADO ALÉM DAQUI
            </li>
          ) : null}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
