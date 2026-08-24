import { useState } from "react";
import { Link } from "@tanstack/react-router";

const steps = [
  { n: "01", q: "A pessoa sabe que será publicada?" },
  { n: "02", q: "Existe autorização?" },
  { n: "03", q: "Qual é o contexto?" },
  { n: "04", q: "Essa publicação pode causar dano?" },
  { n: "05", q: "Eu publicaria isso se fosse comigo?" },
];

export function BeforePosting() {
  const [checked, setChecked] = useState<string[]>([]);
  const toggle = (n: string) =>
    setChecked((c) => (c.includes(n) ? c.filter((x) => x !== n) : [...c, n]));

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
      <ul className="space-y-2">
        {steps.map((s) => {
          const active = checked.includes(s.n);
          return (
            <li key={s.n}>
              <label
                className={`flex cursor-pointer items-center gap-4 border p-4 transition-colors ${
                  active ? "border-primary bg-primary/10" : "border-current/25"
                }`}
              >
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => toggle(s.n)}
                  className="sr-only"
                />
                <span className="label-mono w-8 shrink-0 opacity-60">{s.n}</span>
                <span className="text-base font-semibold md:text-lg">{s.q}</span>
                <span
                  aria-hidden="true"
                  className={`ml-auto flex h-6 w-6 shrink-0 items-center justify-center border ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-current/40"
                  }`}
                >
                  {active ? "✓" : ""}
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <div className="md:w-56">
        <p className="label-mono opacity-60">{checked.length}/5 RESPONDIDAS</p>
        <p className="mt-3 text-sm opacity-80">
          Se você travou em alguma delas, provavelmente ainda não é hora de publicar.
        </p>
        <Link
          to="/entenda"
          className="label-mono mt-5 inline-block bg-primary px-4 py-3 text-primary-foreground"
        >
          VER ANÁLISE JURÍDICA →
        </Link>
      </div>
    </div>
  );
}
