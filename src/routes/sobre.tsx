import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Além do Feed" },
      { name: "description", content: "Manifesto e contexto do projeto Além do Feed." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="surface-dark border-b px-4 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-5xl">
          <span className="label-mono text-primary">MANIFESTO</span>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.88] font-extrabold uppercase md:text-8xl">O feed mostra.<br /><span className="text-primary">A gente vai além.</span></h1>
          <p className="mt-8 max-w-xl text-xl leading-relaxed opacity-80">Nem tudo que aparece no feed termina no feed.</p>
        </div>
      </section>
      <Section label="POR QUE EXISTIMOS" title="Toda publicação tem um depois.">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <p className="text-2xl leading-tight">Uma imagem, um print ou um vídeo parecem simples na tela. Por trás deles existem pessoas, contexto, direitos, escolhas e consequências.</p>
          <div className="border-l-2 border-primary pl-6 text-muted-foreground"><p>O Além do Feed nasceu dentro da disciplina de Direito Digital para transformar dúvidas reais das redes sociais em conversas acessíveis, verificáveis e humanas.</p><p className="mt-4">Não substituímos orientação jurídica individual. Abrimos caminhos para fazer perguntas melhores.</p></div>
        </div>
      </Section>
      <Section dark label="CONTINUE" title="A próxima camada está a um clique.">
        <div className="flex flex-wrap gap-3"><Link to="/o-que-pode-fazer" className="label-mono bg-primary px-5 py-4 text-primary-foreground">POSSO POSTAR? →</Link><Link to="/conteudos" className="label-mono border border-current px-5 py-4">ABRIR O FEED</Link></div>
      </Section>
    </>
  );
}
