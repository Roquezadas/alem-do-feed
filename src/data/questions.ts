import type { Question } from "./types";

export const questions: Question[] = [
  {
    id: "q-foto-outra-pessoa",
    question: "Posso postar uma foto de outra pessoa?",
    status: "depende",
    shortAnswer: "Depende do contexto, da finalidade e de haver autorização.",
    reasoning:
      "O fato de uma pessoa aparecer na fotografia não significa automaticamente que a publicação seja proibida ou permitida. O contexto, a finalidade, a identificação da pessoa, a existência de autorização e o potencial de dano importam. Quanto mais identificável a pessoa e mais exposta ela ficar, maior o cuidado exigido.",
    references: ["Direito à imagem", "Código Civil", "Constituição"],
    lawIds: ["cf-5-x", "cc-20", "lgpd-7"],
    tags: ["Foto", "Imagem", "Redes sociais"],
  },
  {
    id: "q-repostar-story",
    question: "Posso repostar um story?",
    status: "depende",
    shortAnswer: "Repostar amplia o alcance — e a sua parcela de responsabilidade.",
    reasoning:
      "Repostar cria uma nova publicação, com novo público. Se o conteúdo original já era ofensivo ou violava a imagem de alguém, quem reposta contribui para o dano. A permissão da plataforma é uma regra contratual, não uma autorização jurídica da pessoa retratada.",
    references: ["Responsabilidade civil", "Direito à imagem"],
    lawIds: ["cc-186-927", "cf-5-x"],
    tags: ["Story", "Repost", "Compartilhamento"],
  },
  {
    id: "q-print-conversa",
    question: "Posso publicar um print de uma conversa?",
    status: "risco",
    shortAnswer: "Usar como prova é diferente de expor publicamente.",
    reasoning:
      "Uma conversa privada envolve intimidade e vida privada de todos os participantes. Apresentar o print a uma autoridade para provar um fato é diferente de publicar para expor alguém. Na divulgação pública, podem entrar honra, privacidade e dados sensíveis; a veracidade da conversa não elimina automaticamente o risco.",
    references: ["Vida privada", "Crimes contra a honra", "LGPD"],
    lawIds: ["cc-21", "cp-138-140", "lgpd-7"],
    tags: ["Print", "WhatsApp", "Privacidade"],
  },
  {
    id: "q-compartilhar-video",
    question: "Posso compartilhar um vídeo?",
    status: "depende",
    shortAnswer: "Depende de quem aparece, do que mostra e de quem produziu.",
    reasoning:
      "Um vídeo reúne três camadas: a imagem e a voz de quem aparece, o conteúdo retratado e a autoria de quem gravou ou editou. Cada camada tem regra própria — e compartilhar não apaga nenhuma delas.",
    references: ["Direito à imagem", "Direitos autorais"],
    lawIds: ["cf-5-x", "lda-46", "cc-186-927"],
    tags: ["Vídeo", "Compartilhamento"],
  },
  {
    id: "q-meme-rosto",
    question: "Posso fazer um meme com o rosto de alguém?",
    status: "risco",
    shortAnswer: "Humor não é excludente automática de responsabilidade.",
    reasoning:
      "O meme pode ser expressão legítima, mas quando ridiculariza uma pessoa identificável ele toca honra, imagem e dignidade. Se o meme circula em conta monetizada ou promove produto, entra também o uso econômico da imagem.",
    references: ["Honra", "Imagem", "Uso econômico"],
    lawIds: ["cf-5-x", "cp-138-140", "cc-20"],
    tags: ["Meme", "Humor", "Honra"],
  },
  {
    id: "q-local-publico",
    question: "Se a pessoa está em local público, posso fotografá-la?",
    status: "depende",
    shortAnswer: "Estar em público não significa estar disponível para publicação.",
    reasoning:
      "Registrar uma cena pública é diferente de destacar e publicar uma pessoa identificável. A análise costuma olhar se ela é o foco do registro, se a exposição a constrange e qual a finalidade da publicação.",
    references: ["Imagem", "Vida privada"],
    lawIds: ["cf-5-x", "cc-20", "cc-21"],
    tags: ["Local público", "Foto"],
  },
  {
    id: "q-pessoa-publica",
    question: "Posso publicar uma foto de uma pessoa pública?",
    status: "depende",
    shortAnswer: "A exposição é maior, a proteção não desaparece.",
    reasoning:
      "Pessoas públicas têm expectativa de privacidade reduzida em temas de interesse público ligados à sua atuação. Isso não autoriza expor a vida íntima nem usar a imagem para promover produtos sem autorização.",
    references: ["Interesse público", "Imagem"],
    lawIds: ["cf-5-iv-ix", "cc-20"],
    tags: ["Pessoa pública", "Interesse público"],
  },
  {
    id: "q-foto-google",
    question: "Posso repostar uma foto encontrada no Google?",
    status: "risco",
    shortAnswer: "Estar acessível não é o mesmo que estar liberada.",
    reasoning:
      "Buscador é índice, não licença. A foto tem autor, e frequentemente tem alguém retratado. Usar sem autorização pode violar direito autoral e direito de imagem ao mesmo tempo. Dar crédito não substitui autorização.",
    references: ["Direitos autorais", "Imagem"],
    lawIds: ["lda-46", "cf-5-x"],
    tags: ["Google", "Direito autoral"],
  },
  {
    id: "q-apagar-post",
    question: "Se eu apagar o post, acabou o problema?",
    status: "risco",
    shortAnswer: "Apagar reduz o alcance futuro, não apaga o que já aconteceu.",
    reasoning:
      "A responsabilidade nasce no momento da publicação e do dano. Prints, reposts e cópias sobrevivem à remoção. Apagar pode até ajudar na dosimetria da reparação, mas não é uma borracha jurídica.",
    references: ["Responsabilidade civil", "Prova"],
    lawIds: ["cc-186-927", "mci-19-21"],
    tags: ["Remoção", "Permanência"],
  },
  {
    id: "q-audio-conversa",
    question: "Posso publicar um áudio de uma conversa?",
    status: "risco",
    shortAnswer: "Gravar sendo participante é uma coisa; publicar é outra.",
    reasoning:
      "Mesmo quando a gravação é lícita porque um dos interlocutores participava, a divulgação pública envolve voz, intimidade e conteúdo privado de terceiros. O uso como prova em um processo é diferente de subir o áudio no feed.",
    references: ["Vida privada", "Voz"],
    lawIds: ["cc-21", "cf-5-x", "lgpd-7"],
    tags: ["Áudio", "Privacidade"],
  },
];

export const statusLabel: Record<Question["status"], string> = {
  permitido: "NORMALMENTE PERMITIDO",
  depende: "DEPENDE",
  risco: "MAIOR RISCO",
};
