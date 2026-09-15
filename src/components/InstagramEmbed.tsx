import { useEffect, useId, useRef, useState } from "react";
import { Instagram } from "lucide-react";
import { InstagramPreview } from "@/components/InstagramPreview";
import { getInstagramPermalink, loadInstagramSdk } from "@/lib/instagram-sdk";
import type { SocialPost } from "@/data/types";

type Props = {
  url: string;
  title?: string;
  label?: string;
  context?: string;
  preview?: SocialPost["preview"];
  loadOnView?: boolean;
};
type Status = "idle" | "loading" | "ready" | "fallback";
const EMBED_TIMEOUT = 25000;
// O SDK oficial aplica min-width: 326px. Abaixo disso preservamos o card, sem recorte.
const MIN_EMBED_WIDTH = 326;

export function InstagramEmbed(props: Props) {
  // Uma URL nova ganha estado próprio; requisições anteriores não contaminam o próximo post.
  return <InstagramEmbedContent key={props.url} {...props} />;
}

function InstagramEmbedContent({
  url,
  title = "Publicação no Instagram",
  label = "POST",
  context = "Do perfil oficial @alemdofeed.podcast. Confira a publicação original.",
  preview,
  loadOnView = true,
}: Props) {
  const permalink = getInstagramPermalink(url);
  const rootRef = useRef<HTMLElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const autoRequested = useRef(false);
  const [fits, setFits] = useState<boolean | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const titleId = useId();
  const ready = status === "ready" && fits === true;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const measure = () => setFits(mount.clientWidth >= MIN_EMBED_WIDTH);
    measure();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(mount);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!loadOnView || !permalink || fits !== true || autoRequested.current || !rootRef.current)
      return;
    // Sem IntersectionObserver, o botão continua disponível: não antecipar requisições externas.
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          autoRequested.current = true;
          setAttempt((value) => value + 1);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, [fits, loadOnView, permalink]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !permalink || !attempt || fits !== true) return;
    let disposed = false;
    let rendered = false;
    let frame: HTMLIFrameElement | null = null;
    setStatus("loading");

    // O SDK substitui o blockquote. Estes filhos são imperativos e não pertencem ao React.
    // Assim a mutação de terceiros não interfere em hydration, re-render ou unmount.
    const quote = document.createElement("blockquote");
    quote.className = "instagram-media";
    quote.setAttribute("data-instgrm-permalink", permalink);
    quote.setAttribute("data-instgrm-version", "14");
    quote.setAttribute("data-instgrm-captioned", "");
    quote.style.width = "100%";
    const link = document.createElement("a");
    link.href = permalink;
    link.textContent = "Ver publicação no Instagram";
    quote.appendChild(link);
    mount.replaceChildren(quote);

    const timeout = window.setTimeout(fallback, EMBED_TIMEOUT);
    const observer = new MutationObserver(inspect);
    observer.observe(mount, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["class", "height", "style"],
    });

    function fallback() {
      if (disposed) return;
      observer.disconnect();
      window.clearTimeout(timeout);
      frame?.removeEventListener("error", fallback);
      mount?.replaceChildren();
      setStatus("fallback");
    }

    function inspect() {
      if (disposed || !mount) return;
      const candidate = mount.querySelector<HTMLIFrameElement>("iframe");
      if (candidate !== frame) {
        frame?.removeEventListener("error", fallback);
        frame = candidate;
        if (frame) {
          frame.title = `Instagram — ${title}`;
          frame.addEventListener("error", fallback);
        }
      }
      // onload também dispara em páginas bloqueadas. Esperar o SDK montar e dimensionar.
      if (
        frame?.classList.contains("instagram-media-rendered") &&
        Number(frame.getAttribute("height")) >= 200
      ) {
        window.clearTimeout(timeout);
        if (!rendered) {
          rendered = true;
          setStatus("ready");
        }
      } else if (rendered) {
        fallback();
      }
    }

    void loadInstagramSdk()
      .then((sdk) => {
        if (!disposed) {
          sdk.process();
          inspect();
        }
      })
      .catch(fallback);

    return () => {
      disposed = true;
      observer.disconnect();
      window.clearTimeout(timeout);
      frame?.removeEventListener("error", fallback);
      mount.replaceChildren();
    };
  }, [attempt, fits, permalink, title]);

  function requestEmbed() {
    autoRequested.current = true;
    setAttempt((value) => value + 1);
  }

  return (
    <article
      ref={rootRef}
      aria-labelledby={titleId}
      className="instagram-embed-card social-publication frame-open"
      data-status={ready ? "ready" : status}
    >
      <div className="instagram-embed-copy">
        <div className="flex items-center justify-between gap-4">
          <span className="label-mono text-muted-foreground">{label} / INSTAGRAM</span>
          <Instagram size={22} aria-hidden="true" />
        </div>
        <h3 id={titleId} className="mt-6 text-2xl font-extrabold tracking-tight uppercase">
          {title}
        </h3>
        {!ready ? <p className="mt-3 text-sm text-muted-foreground">{context}</p> : null}
        {!ready && preview ? <InstagramPreview preview={preview} /> : null}
      </div>

      <div className="instagram-embed-slot" data-ready={ready} aria-hidden={!ready} inert={!ready}>
        <div ref={mountRef} className="instagram-embed-mount" />
      </div>

      <div className="instagram-embed-copy">
        <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
          {fits === false || !permalink || status === "fallback"
            ? "A publicação continua disponível no Instagram."
            : status === "loading"
              ? "Carregando a publicação. Você também pode abrir o link abaixo."
              : ready
                ? "Conteúdo incorporado do Instagram."
                : "A incorporação se conecta ao Instagram ao carregar."}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={permalink ? url : "https://www.instagram.com/"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver ${title.toLowerCase()} no Instagram (nova aba)`}
            className="label-mono border-b border-primary py-3 text-primary"
          >
            VER PUBLICAÇÃO NO INSTAGRAM →
          </a>
          {permalink && fits !== false ? (
            <button
              type="button"
              disabled={status === "loading"}
              onClick={
                ready
                  ? () => {
                      setAttempt(0);
                      setStatus("idle");
                    }
                  : requestEmbed
              }
              className="label-mono border border-current px-3 py-3 disabled:opacity-60"
            >
              {ready
                ? "OCULTAR INCORPORAÇÃO"
                : status === "loading"
                  ? "CARREGANDO…"
                  : status === "fallback"
                    ? "TENTAR NOVAMENTE"
                    : "CARREGAR PUBLICAÇÃO"}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
