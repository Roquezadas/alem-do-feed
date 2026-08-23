import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { PostSimulator } from "@/components/PostSimulator";
import { QuestionCard } from "@/components/cards/QuestionCard";
import { questions } from "@/data/questions";

const title = "O que pode fazer? — Além do Feed";
const description =
  "Guia interativo sobre o que pode e o que não pode ser publicado nas redes sociais: fotos, prints, memes, stories e áudios, com fundamento jurídico.";

export const Route = createFileRoute("/o-que-pode-fazer")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/o-que-pode-fazer" },
    ],
    links: [{ rel: "canonical", href: "/o-que-pode-fazer" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <Section
        label="FERRAMENTA EDITORIAL"
        title="Posso postar?"
        intro="Monte o cenário: formato, quem aparece e contexto. O resultado é uma camada educativa, não uma sentença."
      >
        <PostSimulator />
      </Section>

      <Section
        label="PERGUNTAS"
        title="O que pode fazer?"
        intro="As dúvidas que mais aparecem na nossa caixinha, respondidas com o fundamento correspondente."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {questions.map((q) => (
            <QuestionCard key={q.id} item={q} />
          ))}
        </div>
      </Section>
    </>
  );
}
