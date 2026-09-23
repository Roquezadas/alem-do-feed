import type { SocialPost } from "./types";
import { latestEpisode } from "./episodes";

/** Links oficiais fornecidos pelo projeto. */
export const social = {
  instagram: "https://www.instagram.com/alemdofeed.podcast/",
  spotify: latestEpisode.spotifyUrl,
};

// Acrescente posts aqui. `context` e `preview` são opcionais e só devem usar material verificado.
// Sem scraping: as capas originais podem ser importadas de src/assets e informadas em `preview`.
export const instagramPosts: SocialPost[] = [
  {
    id: "instagram-post-01",
    label: "POST 01",
    title: "Publicação 01",
    url: "https://www.instagram.com/p/DczNevnoCXv/?img_index=1",
  },
  {
    id: "instagram-post-02",
    label: "POST 02",
    title: "Publicação 02",
    url: "https://www.instagram.com/p/DdCmNBDINfr/?img_index=1",
  },
];
