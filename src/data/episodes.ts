import type { Episode } from "./types";
import coverEp01 from "@/assets/ep01-quem-autorizou-spotify.jpg";

// Mais recente primeiro: Home, arquivo e links globais usam a mesma seleção.
export const episodes: [Episode, ...Episode[]] = [
  {
    id: "ep-02",
    slug: "isso-e-real",
    number: "EP. 02",
    title: "ISSO É REAL?",
    subtitle: "Deepfakes, inteligência artificial e identidade digital",
    description:
      "Quando rosto, voz e imagem podem ser reproduzidos por inteligência artificial, descobrir o que é verdadeiro passa a ser também uma questão de direitos.",
    spotifyUrl: "https://open.spotify.com/episode/1mCK51FFYaM8NnUaKIRmGA",
    spotifyId: "1mCK51FFYaM8NnUaKIRmGA",
    // O Spotify publica a mesma capa nos dois episódios (oEmbed verificado em 23/09/2026).
    coverImage: coverEp01,
    coverSourceUrl: "https://i.scdn.co/image/ab6765630000ba8a3cd66e4942b52811cea43039",
    // Metatags públicas music:release_date e music:duration do Spotify, em 23/09/2026.
    date: "2026-09-23T03:44:00Z",
    duration: "11 min 01 s",
    topics: [
      "É o seu rosto. É a sua voz. Mas você nunca gravou aquilo",
      "Deepfakes, clonagem de voz e conteúdos que parecem verdadeiros",
      "Uma imagem pode ser falsa. O dano à pessoa pode ser real",
      "Imagem, honra, privacidade e identidade digital",
      "A responsabilidade de quem cria e de quem compartilha",
      "Verificar antes de compartilhar e buscar proteção diante do dano",
    ],
    lawIds: ["cf-5-x", "cc-20", "cc-186-927", "cc-21", "lgpd-7", "cp-138-140"],
    // Fundamentos gerais relacionados; não são julgamentos específicos sobre deepfakes.
    caseIds: [],
    evidenceTopicSlug: "inteligencia-artificial",
    tags: ["Deepfakes", "Inteligência artificial", "Identidade digital"],
  },
  {
    id: "ep-01",
    slug: "quem-autorizou",
    number: "EP. 01",
    title: "QUEM AUTORIZOU?",
    subtitle: "Direito à imagem nas redes sociais",
    description:
      "Uma foto sobe em segundos. A pergunta jurídica que ela abre pode durar anos. No primeiro episódio, discutimos o que muda quando outra pessoa aparece na sua publicação: contexto, finalidade, identificação, autorização e as consequências de errar a mão.",
    spotifyUrl: "https://open.spotify.com/episode/0DEP800hwGTcQwGc2Y5U7O",
    spotifyId: "0DEP800hwGTcQwGc2Y5U7O",
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
    evidenceTopicSlug: "direito-a-imagem",
    tags: ["Direito à imagem", "Privacidade", "Redes sociais"],
  },
];

export const latestEpisode = episodes[0];

export const getEpisode = (slug: string) => episodes.find((e) => e.slug === slug);
