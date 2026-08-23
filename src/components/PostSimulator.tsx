import { useState } from "react";
import { Tag } from "@/components/Tag";

const formats = ["FOTO", "VÍDEO", "PRINT", "ÁUDIO", "MEME", "STORY", "COMPARTILHAMENTO"] as const;
const people = ["EU", "OUTRA PESSOA", "PESSOA PÚBLICA", "CRIANÇA/ADOLESCENTE"] as const;
const contexts = ["COTIDIANO", "EVENTO PÚBLICO", "DENÚNCIA", "HUMOR", "PUBLICIDADE", "PRIVADO"] as const;

type Format = (typeof formats)[number];
type Person = (typeof people)[number];
type Context = (typeof contexts)[number];

function evaluate(format: Format, person: Person, context: Context) {
  if (person === "EU" && context !== "PUBLICIDADE") {
    return {
      level: "NORMALMENTE PERMITIDO" as const,
      tone: "cobalt" as const,
      note: "Publicar a própria imagem é exercício do seu direito. Ainda assim, observe quem mais aparece no enquadramento e o que a publicação revela sobre terceiros.",
    };
  }

  const highRisk =
    person === "CRIANÇA/ADOLESCENTE" ||
    context === "PUBLICIDADE" ||
    context === "PRIVADO" ||
    format === "PRINT" ||
    format === "ÁUDIO";

  if (highRisk) {
    return {
      level: "MAIOR RISCO" as const,
      tone: "coral" as const,
      note:
        person === "CRIANÇA/ADOLESCENTE"
          ? "A proteção de crianças e adolescentes é reforçada pelo ECA e pela Constituição. Sem autorização dos responsáveis e finalidade legítima, o risco é alto."
          : context === "PUBLICIDADE"
            ? "Uso com finalidade econômica é o cenário mais delicado: a Súmula 403 do STJ dispensa até a prova do prejuízo."
            : "Conteúdo privado, prints e áudios expõem intimidade de quem não consentiu — somando imagem, vida privada e possíveis crimes contra a honra.",
    };
  }

  return {
    level: "DEPENDE" as const,
    tone: "default" as const,
    note:
      person === "PESSOA PÚBLICA"
        ? "A exposição de pessoas públicas é maior quando o assunto tem interesse público e relação com sua atuação — mas a vida íntima continua protegida."
        : "O resultado varia conforme identificação, foco do registro, finalidade e potencial de constrangimento. Na dúvida, peça autorização.",
  };
}

function Group<T extends string>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="label-mono text-muted-foreground">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            aria-pressed={value === o}
            className={`label-mono border px-3 py-3 transition-colors ${
              value === o ? "border-foreground bg-foreground text-background" : "border-border"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function PostSimulator() {
  const [format, setFormat] = useState<Format>("FOTO");
  const [person, setPerson] = useState<Person>("OUTRA PESSOA");
  const [context, setContext] = useState<Context>("COTIDIANO");

  const result = evaluate(format, person, context);

  return (
    <div className="frame-open p-6 md:p-8">
      <h3 className="font-display text-2xl font-extrabold tracking-tight uppercase">Posso postar?</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Escolha o cenário e veja a camada jurídica por trás dele.
      </p>

      <div className="mt-8 space-y-6">
        <Group legend="O QUE VOCÊ VAI POSTAR?" options={formats} value={format} onChange={setFormat} />
        <Group legend="QUEM APARECE?" options={people} value={person} onChange={setPerson} />
        <Group legend="QUAL É O CONTEXTO?" options={contexts} value={context} onChange={setContext} />
      </div>

      <div className="mt-8 border-t border-dashed pt-6" aria-live="polite">
        <Tag tone={result.tone}>{result.level}</Tag>
        <p className="mt-4 max-w-2xl text-base leading-relaxed">{result.note}</p>
        <p className="mt-6 text-xs text-muted-foreground">
          Isto é um guia educativo. Direito não funciona como um teste matemático: cada caso concreto
          exige análise própria e este resultado não substitui orientação jurídica.
        </p>
      </div>
    </div>
  );
}
