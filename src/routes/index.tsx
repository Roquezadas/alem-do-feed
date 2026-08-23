import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroFrame } from "@/components/HeroFrame";
import { Section } from "@/components/Section";
import { BeforePosting } from "@/components/BeforePosting";
import { ShareChain } from "@/components/ShareChain";
import { QuestionCard } from "@/components/cards/QuestionCard";
import { LawCard } from "@/components/cards/LawCard";
import { CaseCard } from "@/components/cards/CaseCard";
import { MythCard } from "@/components/cards/MythCard";
import { EpisodeCard } from "@/components/cards/EpisodeCard";
import { FeedCard } from "@/components/cards/FeedCard";
import { SocialCard } from "@/components/cards/SocialCard";
import { questions } from "@/data/questions";
import { laws } from "@/data/laws";
import { cases } from "@/data/cases";
import { myths } from "@/data/myths";
import { episodes } from "@/data/episodes";
import { feedItems, socialPosts } from "@/data/feed";

const title = "Além do Feed — Direito Digital, redes sociais e proteção da imagem";
const description =
  "Podcast sobre Direito Digital, redes sociais, proteção da imagem, privacidade, liberdade de expressão e responsabilidade na internet.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "PodcastSeries",
          name: "Além do Feed",
          description,
          inLanguage: "pt-BR",
          about: "Direito Digital, proteção da imagem e redes sociais",
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <HeroFrame />

      <Section
        id="o-que-pode-fazer"
        label="EXPERIÊNCIA JURÍDICA"
        title="O que pode fazer?"
        intro="Situações comuns de rede social e o limite jurídico de cada uma. Abra o card para ver o fundamento."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {questions.slice(0, 6).map((q) => (
            <QuestionCard key={q.id} item={q} />
          ))}
        </div>
        <Link
          to="/o-que-pode-fazer"
          className="label-mono mt-8 inline-block bg-foreground px-5 py-4 text-background"
        >
          VER TODAS AS PERGUNTAS →
        </Link>
      </Section>

      <Section
        label="LEGISLAÇÃO"
        title="O que a lei diz?"
        intro="Da Constituição à LGPD: os textos que sustentam qualquer discussão sobre imagem na internet."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {laws.slice(0, 3).map((l) => (
            <LawCard key={l.id} law={l} />
          ))}
        </div>
        <Link to="/leis" className="label-mono mt-8 inline-block border border-foreground px-5 py-4">
          VER TODA A LEGISLAÇÃO →
        </Link>
      </Section>

      <Section
        label="JURISPRUDÊNCIA"
        title="O que os tribunais dizem?"
        intro="Decisões verificáveis do STF e do STJ, explicadas sem juridiquês e sempre com link para a fonte oficial."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {cases.slice(0, 2).map((c) => (
            <CaseCard key={c.id} item={c} />
          ))}
        </div>
        <Link
          to="/jurisprudencia"
          className="label-mono mt-8 inline-block border border-foreground px-5 py-4"
        >
          VER STF E STJ →
        </Link>
      </Section>

      <Section
        dark
        label="CHECKLIST"
        title="Antes de postar"
        intro="Cinco perguntas que você deveria fazer antes de publicar alguém."
      >
        <BeforePosting />
      </Section>

      <Section
        label="DESMONTANDO"
        title="Mitos do feed"
        intro="Frases que todo mundo repete — e o que o Direito responde a cada uma."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {myths.slice(0, 3).map((m) => (
            <MythCard key={m.id} item={m} />
          ))}
        </div>
        <Link to="/mitos" className="label-mono mt-8 inline-block border border-foreground px-5 py-4">
          VER TODOS OS MITOS →
        </Link>
      </Section>

      <Section
        label="PODCAST"
        title="Episódios"
        intro="Cada episódio começa em uma publicação qualquer e termina em uma consequência jurídica concreta."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {episodes.map((e) => (
            <EpisodeCard key={e.id} episode={e} />
          ))}
          <div className="frame-open flex flex-col justify-center gap-3 border-dashed p-8">
            <span className="label-mono text-muted-foreground">EM PRODUÇÃO</span>
            <p className="font-display text-2xl font-extrabold uppercase">EP. 02</p>
            <p className="text-sm text-muted-foreground">
              Print, áudio e conversa privada: até onde vai a intimidade digital.
            </p>
          </div>
        </div>
      </Section>

      <Section
        dark
        label="PERMANÊNCIA"
        title="O feed não esquece"
        intro="Uma publicação some da timeline. As cópias, não."
      >
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { t: "PUBLICAÇÃO", d: "O conteúdo entra no ar e alcança o primeiro público." },
            { t: "PRINT", d: "Alguém salva. A partir daqui você já não controla as cópias." },
            { t: "REPOST", d: "O conteúdo ganha novos contextos e novas legendas." },
            { t: "REMOÇÃO", d: "Apagar interrompe a circulação oficial. O resto continua existindo." },
          ].map((l, i) => (
            <div
              key={l.t}
              className="border p-5"
              style={{ opacity: 1 - i * 0.14, transform: `translateY(${i * 6}px)` }}
            >
              <span className="label-mono opacity-60">CAMADA 0{i + 1}</span>
              <h3 className="mt-3 text-lg font-bold">{l.t}</h3>
              <p className="mt-2 text-sm opacity-80">{l.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        label="RESPONSABILIDADE"
        title="Quem compartilhou?"
        intro="Quem publicou primeiro é sempre o único responsável? Atravesse a cadeia."
      >
        <ShareChain />
      </Section>

      <Section
        label="FEED"
        title="O feed real"
        intro="Nossos conteúdos em camadas: post na superfície, contexto, direito e consequência logo abaixo."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {feedItems.slice(0, 3).map((f) => (
            <FeedCard key={f.id} item={f} />
          ))}
        </div>
        <Link
          to="/conteudos"
          className="label-mono mt-8 inline-block bg-primary px-5 py-4 text-primary-foreground"
        >
          ABRIR O FEED COMPLETO →
        </Link>
      </Section>

      <Section
        label="REDES"
        title="Do feed para cá"
        intro="Os conteúdos curtos do projeto continuam nas plataformas. Aqui eles ganham a camada jurídica."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {socialPosts.map((s) => (
            <SocialCard key={s.id} post={s} />
          ))}
        </div>
      </Section>

      <section className="surface-dark border-t px-4 py-24 text-center md:px-8 md:py-32">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl leading-[0.9] font-extrabold tracking-tighter uppercase md:text-7xl">
            O feed mostra.
            <br />
            <span className="text-[oklch(0.703_0.176_26)]">A gente vai além.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed opacity-80">
            Porque uma publicação pode durar alguns segundos. As consequências podem durar muito
            mais.
          </p>
          <Link
            to="/conteudos"
            className="label-mono mt-10 inline-block bg-primary px-8 py-5 text-primary-foreground"
          >
            EXPLORAR O ALÉM →
          </Link>
        </div>
      </section>
    </>
  );
}
