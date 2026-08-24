import type { FeedItem, SocialPost } from "./types";

export const feedItems: FeedItem[] = [
  {
    id: "f-01",
    type: "episodio",
    date: "2026-08-18",
    label: "EPISÓDIO",
    title: "EP. 01 — Quem autorizou?",
    summary:
      "Direito à imagem nas redes sociais: o que muda quando outra pessoa aparece na sua publicação.",
    layerContext:
      "Uma foto de grupo é publicada. Uma das pessoas não queria aparecer e pede a remoção.",
    layerLaw:
      "Constituição, art. 5º, X e Código Civil, arts. 20 e 21: imagem, honra e vida privada são invioláveis.",
    layerConsequence:
      "Recusar a remoção pode transformar um pedido informal em pedido de indenização por dano moral.",
    href: "/episodios/quem-autorizou",
    tags: ["Episódios", "Redes sociais"],
  },
  {
    id: "f-02",
    type: "pergunta",
    date: "2026-08-16",
    label: "PERGUNTA",
    title: "Posso publicar um print de uma conversa?",
    summary: "A pergunta mais repetida da caixinha — e a de maior risco jurídico.",
    layerContext:
      "Print de conversa privada exposto em uma publicação aberta, com nome e foto do outro participante.",
    layerLaw:
      "Código Civil, art. 21 (vida privada), Código Penal, arts. 138 a 140 (honra) e LGPD, art. 7º.",
    layerConsequence:
      "Somam-se três frentes possíveis: reparação civil, responsabilização penal e reclamação sobre uso de dados.",
    href: "/o-que-pode-fazer",
    tags: ["Dicas", "Redes sociais"],
  },
  {
    id: "f-03",
    type: "caso",
    date: "2026-08-14",
    label: "TRIBUNAIS",
    title: "Uso econômico da imagem: dano presumido",
    summary: "A Súmula 403 do STJ dispensa a prova do prejuízo quando há fim comercial.",
    layerContext: "Uma foto de cliente é usada na divulgação de um serviço, sem autorização.",
    layerLaw: "Súmula 403 do STJ.",
    layerConsequence:
      "Basta demonstrar o uso e a finalidade econômica: o prejuízo não precisa ser provado.",
    href: "/jurisprudencia",
    tags: ["STJ", "Casos"],
  },
  {
    id: "f-04",
    type: "lei",
    date: "2026-08-12",
    label: "LEI",
    title: "Sua imagem é um dado pessoal",
    summary: "A LGPD alcança imagem e voz sempre que elas identificam uma pessoa.",
    layerContext: "Perfil monetizado publica rostos de pessoas atendidas no estabelecimento.",
    layerLaw: "LGPD, arts. 5º, I e 7º; a exceção do art. 4º, II não cobre uso econômico.",
    layerConsequence:
      "Sem base legal, o tratamento é irregular e pode gerar reclamação e responsabilização.",
    href: "/leis",
    tags: ["Leis", "IA"],
  },
  {
    id: "f-05",
    type: "artigo",
    date: "2026-08-10",
    label: "ANÁLISE",
    title: "Quem compartilhou também responde?",
    summary: "A cadeia publicou → repostou → compartilhou → viralizou, explicada por etapas.",
    layerContext: "Um vídeo ofensivo ganha alcance depois de ser repostado por contas maiores.",
    layerLaw: "Código Civil, arts. 186 e 927; Súmula 221 do STJ, por analogia.",
    layerConsequence: "Cada nova difusão pode ser um novo ato, com responsabilidade própria.",
    href: "/quem-compartilhou",
    tags: ["Casos", "Dicas"],
  },
  {
    id: "f-06",
    type: "mito",
    date: "2026-08-08",
    label: "MITO DO FEED",
    title: "“Se eu der crédito, posso repostar.”",
    summary: "Crédito é boa educação digital. Não é autorização.",
    layerContext: "Reels de terceiro republicado com @ do autor na legenda.",
    layerLaw: "Lei 9.610/1998, art. 29: o uso depende de autorização prévia e expressa.",
    layerConsequence: "O autor pode exigir remoção e reparação, mesmo com o crédito visível.",
    href: "/mitos",
    tags: ["Dicas", "Redes sociais"],
  },
  {
    id: "f-07",
    type: "bastidor",
    date: "2026-08-06",
    label: "BASTIDOR",
    title: "Como escolhemos as perguntas do episódio",
    summary: "Recebemos dúvidas reais e transformamos em roteiro jurídico acessível.",
    layerContext: "Caixinha de perguntas aberta por uma semana no perfil do projeto.",
    layerLaw: "Cada dúvida é mapeada para um fundamento legal antes de virar pauta.",
    layerConsequence:
      "O episódio nasce de situações concretas, não de hipóteses abstratas de manual.",
    href: "/sobre",
    tags: ["Episódios"],
  },
  {
    id: "f-08",
    type: "caso",
    date: "2026-08-04",
    label: "TRIBUNAIS",
    title: "Plataformas e o Tema 987 do STF",
    summary: "O que muda na responsabilidade de quem hospeda o conteúdo.",
    layerContext: "Conteúdo ofensivo permanece no ar mesmo após notificação da vítima.",
    layerLaw: "Marco Civil, art. 19, com a leitura fixada pelo STF no Tema 987.",
    layerConsequence:
      "A notificação extrajudicial ganha peso e o silêncio da plataforma custa caro.",
    href: "/jurisprudencia",
    tags: ["STF", "Casos"],
  },
];

export const feedFilters = [
  "TUDO",
  "LEIS",
  "STF",
  "STJ",
  "EPISÓDIOS",
  "DICAS",
  "CASOS",
  "REDES SOCIAIS",
  "IA",
] as const;

/**
 * Conteúdo social: arquitetura em três opções.
 * A) embed oficial (embeddable + videoId/url)
 * B) card com thumbnail + link (padrão atual)
 * C) cadastro manual futuro em banco de dados
 */
export const socialPosts: SocialPost[] = [
  {
    id: "s-01",
    platform: "instagram",
    kind: "reel",
    caption: "Três coisas que a gente confunde sobre postar foto dos outros.",
    date: "2026-08-17",
    url: "https://instagram.com/alemdofeed",
    embeddable: false,
  },
  {
    id: "s-02",
    platform: "instagram",
    kind: "carrossel",
    caption: "Autorização não é genérica, não é eterna e pode ser revogada.",
    date: "2026-08-15",
    url: "https://instagram.com/alemdofeed",
    embeddable: false,
  },
  {
    id: "s-03",
    platform: "instagram",
    kind: "post",
    caption: "“Apaguei, então acabou.” Spoiler: não acabou.",
    date: "2026-08-11",
    url: "https://instagram.com/alemdofeed",
    embeddable: false,
  },
  {
    id: "s-04",
    platform: "youtube",
    kind: "short",
    caption: "Local público não é sinônimo de publicação livre.",
    date: "2026-08-09",
    url: "https://youtube.com/@alemdofeed",
    embeddable: false,
  },
];

export const social = {
  instagram: "https://instagram.com/alemdofeed",
  youtube: "https://youtube.com/@alemdofeed",
  tiktok: "https://tiktok.com/@alemdofeed",
};
