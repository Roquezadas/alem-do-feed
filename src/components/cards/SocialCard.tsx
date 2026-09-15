import { Instagram } from "lucide-react";
import { InstagramPreview } from "@/components/InstagramPreview";
import type { SocialPost } from "@/data/types";

/** Card editorial de acesso à publicação, não uma reprodução do post. */
export function SocialCard({ post }: { post: SocialPost }) {
  return (
    <article className="social-publication frame-open flex flex-col p-6 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <span className="label-mono text-muted-foreground">{post.label} / INSTAGRAM</span>
        <Instagram size={22} aria-hidden="true" />
      </div>
      {post.preview ? <InstagramPreview preview={post.preview} /> : null}
      <h3 className="mt-10 text-3xl font-extrabold tracking-tight uppercase">{post.title}</h3>
      <p className="mt-3 text-sm text-muted-foreground">
        {post.context ??
          "Do perfil oficial @alemdofeed.podcast. Abra a publicação para ver o conteúdo completo."}
      </p>
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ver ${post.title.toLowerCase()} no Instagram (nova aba)`}
        className="label-mono mt-8 inline-flex items-center gap-2 self-start border-b border-primary py-3 text-primary"
      >
        VER NO INSTAGRAM →
      </a>
    </article>
  );
}
