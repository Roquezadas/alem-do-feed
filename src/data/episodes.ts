import type { Episode } from "./types";
import coverEp01 from "@/assets/ep01-quem-autorizou-spotify.jpg";
import { social } from "./social";

export const episodes: [Episode, ...Episode[]] = [
  {
    id: "ep-01",
    slug: "quem-autorizou",
    number: "EP. 01",
    title: "QUEM AUTORIZOU?",
    subtitle: "Direito à imagem nas redes sociais",
    description:
      "Uma foto sobe em segundos. A pergunta jurídica que ela abre pode durar anos. No primeiro episódio, discutimos o que muda quando outra pessoa aparece na sua publicação: contexto, finalidade, identificação, autorização e as consequências de errar a mão.",
    spotifyUrl: social.spotify,
    spotifyId: "0DEP800hwGTcQwGc2Y5U7O",
    instagramUrl: social.instagram,
    coverImage: coverEp01,
    coverSourceUrl:
      "https://image-cdn-ak.spotifycdn.com/image/ab6765630000ba8a3cd66e4942b52811cea43039",
    // Metadados do player público do Spotify, verificados em 15/09/2026.
    date: "2026-09-15T02:11:00Z",
    duration: "8 min 17 s",
    topics: [
      "Quando a imagem de alguém vira um dado pessoal",
      "O que significa autorização e por que 'estava na festa' não é uma",
      "Local público não é sinônimo de publicação livre",
      "Uso comercial, monetização e dano presumido",
      "Quem responde: quem publicou, quem repostou, quem compartilhou",
      "Apagar o post resolve? O que sobra depois da remoção",
    ],
    lawIds: ["cf-5-x", "cc-20", "cc-21", "lgpd-7", "cc-186-927"],
    caseIds: ["stj-sumula-403", "stf-adi-4815", "stf-re-1010606"],
    tags: ["Direito à imagem", "Privacidade", "Redes sociais"],
  },
];

export const getEpisode = (slug: string) => episodes.find((e) => e.slug === slug);
