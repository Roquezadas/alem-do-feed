import { Section } from "@/components/Section";
import { SocialCard } from "@/components/cards/SocialCard";
import { InstagramEmbed } from "@/components/InstagramEmbed";
import { social, instagramPosts } from "@/data/social";

export function InstagramSection({ index, embed = false }: { index?: string; embed?: boolean }) {
  return (
    <Section
      id="instagram"
      {...(index ? { index } : {})}
      label="INSTAGRAM / @ALEMDOFEED.PODCAST"
      title={embed ? "Do nosso feed." : "A conversa continua no Instagram."}
      intro={
        embed
          ? "Publicações reais do projeto, incorporadas do Instagram. Se a plataforma não estiver disponível, o link para cada post continua aqui."
          : "O projeto está no ar. Explore as publicações e acompanhe o Além do Feed no perfil oficial."
      }
    >
      <div className={embed ? "instagram-embed-grid" : "grid gap-5 md:grid-cols-2"}>
        {instagramPosts.map((post) =>
          embed ? (
            <InstagramEmbed key={post.id} {...post} />
          ) : (
            <SocialCard key={post.id} post={post} />
          ),
        )}
      </div>
      <a
        href={social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="label-mono mt-8 inline-block bg-foreground px-5 py-4 text-background"
      >
        SEGUIR NO INSTAGRAM ↗
      </a>
    </Section>
  );
}
