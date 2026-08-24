import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { Tag } from "@/components/Tag";
import { topics } from "@/data/topics";

export const Route = createFileRoute("/entenda")({
  head: () => ({
    meta: [
      { title: "Entenda — Além do Feed" },
      { name: "description", content: "Conceitos de Direito Digital explicados a partir da vida real online." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <Section label="CAMADA OCULTA" title="O que existe por trás de uma publicação?" intro="Conceitos essenciais para ler o feed com mais contexto, cuidado e responsabilidade.">
      <div className="grid gap-4 md:grid-cols-2">
        {topics.map((topic, index) => (
          <article key={topic.id} className={`frame-open p-6 ${index === 0 ? "md:col-span-2 md:p-10" : ""}`}>
            <Tag tone={index % 2 === 0 ? "cobalt" : "outline"}>{topic.name}</Tag>
            <h2 className="mt-5 font-display text-2xl font-extrabold uppercase">{topic.name}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{topic.definition}</p>
            <p className="mt-5 border-l-2 border-primary pl-4 text-sm leading-relaxed">{topic.example}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
