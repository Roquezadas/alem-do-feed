import type { ExperimentalScenario, FeedAction } from "./types";

const official = (label: string, url: string) => ({ label, url });

export const experimentalScenarios: ExperimentalScenario[] = [
  {
    id: "video-constrangedor",
    type: "video",
    profile: "@cidadeemdia",
    timestamp: "há 12 min",
    title: "Um instante fora de hora virou vídeo.",
    description:
      "Uma pessoa derruba o café e papéis durante um evento. O vídeo ainda parece pequeno.",
    contentLabel: "VÍDEO · 00:08",
    caption: "olha isso KKKKK",
    mediaAlt:
      "Pessoa em um evento se surpreende ao derrubar café e papéis, em uma cena cotidiana sem ferimentos.",
    topicSlug: "direito-a-imagem",
    metrics: { likes: 2391, comments: 318, shares: 74 },
    actions: [
      { id: "share", label: "Compartilhar" },
      { id: "report", label: "Denunciar" },
      { id: "ask", label: "Ver contexto" },
      { id: "ignore", label: "Continuar rolando" },
    ],
    consequence: {
      headline: "O conteúdo não terminou no seu clique.",
      summary:
        "O compartilhamento cria uma nova etapa de circulação e pode ampliar a exposição de uma pessoa identificável.",
      context:
        "A análise depende do conteúdo, da finalidade, do alcance, do contexto e dos direitos envolvidos.",
      legalTopics: ["Imagem", "Honra", "Privacidade", "Consentimento"],
      risk: "attention",
    },
    xray: [
      { label: "PESSOA IDENTIFICÁVEL", value: "SIM" },
      { label: "CONSENTIMENTO", value: "NÃO VERIFICADO", alert: true },
      { label: "CONTEÚDO CONSTRANGEDOR", value: "SIM" },
      { label: "CONTEXTO ORIGINAL", value: "PARCIALMENTE PERDIDO", alert: true },
      { label: "ALCANCE", value: "EM EXPANSÃO", alert: true },
    ],
    propagation: [
      {
        id: "video-repost",
        kind: "repost",
        profile: "@agoraonline",
        timestamp: "agora",
        label: "REPOSTADO",
        caption: "eu não aguentaria 😭",
        metrics: { likes: 6840, comments: 721, shares: 1108 },
        crop: "close",
      },
      {
        id: "video-print",
        kind: "screenshot",
        profile: "@comentariosabertos",
        timestamp: "+ 3 min",
        label: "PRINT",
        caption: "o frame que virou assunto no grupo",
        metrics: { likes: 11200, comments: 986, shares: 2040 },
        crop: "offset",
      },
      {
        id: "video-meme",
        kind: "meme",
        profile: "@recortediario",
        timestamp: "+ 8 min",
        label: "FORA DO CONTEXTO",
        caption: "quando a segunda-feira começa",
        metrics: { likes: 23400, comments: 312, shares: 4891 },
        crop: "compressed",
      },
      {
        id: "video-commentary",
        kind: "commentary",
        profile: "@contexto24",
        timestamp: "+ 16 min",
        label: "REAÇÃO",
        caption: "a internet já decidiu quem essa pessoa é",
        metrics: { likes: 31900, comments: 2910, shares: 6820 },
        crop: "wide",
      },
    ],
    contextResult: {
      label: "PUBLICAÇÃO ORIGINAL ENCONTRADA",
      title: "O evento tinha contexto. O recorte, não.",
      body: "O vídeo veio de uma atividade cultural. A pessoa não publicou a cena e não há informação de consentimento para a circulação.",
    },
    layers: [
      { label: "01", title: "PESSOA", body: "Antes da métrica, existe alguém identificável." },
      {
        label: "02",
        title: "CONTEXTO",
        body: "O recorte eliminou o que aconteceu antes e depois.",
      },
      {
        label: "03",
        title: "CONSENTIMENTO",
        body: "Estar no evento não confirma autorização para viralizar.",
      },
      {
        label: "04",
        title: "DIREITO",
        body: "Imagem, honra e privacidade podem entrar na análise.",
      },
    ],
    sources: [
      official(
        "Constituição Federal, art. 5º, X",
        "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm",
      ),
      official(
        "Código Civil, arts. 20 e 21",
        "https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm",
      ),
    ],
  },
  {
    id: "print-acusacao",
    type: "screenshot",
    profile: "@entrelinhas",
    timestamp: "há 31 min",
    title: "Uma conversa privada chegou até você.",
    description:
      "O print parece provar uma acusação, mas começa no meio e termina antes da resposta.",
    contentLabel: "CAPTURA DE CONVERSA",
    caption: "agora todo mundo vai saber",
    mediaAlt: "Representação gráfica de uma conversa privada parcialmente ocultada.",
    topicSlug: "gravar-e-divulgar",
    metrics: { likes: 421, comments: 31, shares: 76 },
    actions: [
      { id: "share", label: "Enviar" },
      { id: "authority", label: "Encaminhar à autoridade" },
      { id: "ask", label: "Ver contexto" },
      { id: "ignore", label: "Guardar" },
    ],
    consequence: {
      headline: "Prova e exposição são etapas diferentes.",
      summary: "Uma conversa pode ajudar a provar um fato sem precisar virar publicação.",
      context: "Mesmo um conteúdo verdadeiro pode envolver privacidade, intimidade e honra.",
      legalTopics: ["Privacidade", "Honra", "Prova", "Contexto"],
      risk: "high",
    },
    xray: [
      { label: "CONVERSA PRIVADA", value: "SIM" },
      { label: "TERCEIROS IDENTIFICÁVEIS", value: "SIM", alert: true },
      { label: "CONTEXTO", value: "PARCIAL" },
      { label: "ORIGEM", value: "NÃO VERIFICADA", alert: true },
    ],
    propagation: [
      {
        id: "print-repost",
        kind: "screenshot",
        profile: "@telasolta",
        timestamp: "agora",
        label: "NOVO PRINT",
        caption: "sem os nomes, mas todo mundo reconheceu",
        metrics: { likes: 1900, comments: 204, shares: 440 },
        crop: "close",
      },
      {
        id: "print-comment",
        kind: "commentary",
        profile: "@agoraonline",
        timestamp: "+ 9 min",
        label: "ACUSAÇÃO",
        caption: "um trecho passou a representar a conversa inteira",
        metrics: { likes: 6800, comments: 1200, shares: 2100 },
        crop: "compressed",
      },
    ],
    contextResult: {
      label: "CONTEXTO INCOMPLETO",
      title: "O começo e a resposta não estão no print.",
      body: "A origem não foi confirmada. Encaminhar material a uma autoridade tem finalidade diferente de expor pessoas no feed.",
    },
    layers: [
      {
        label: "01",
        title: "ORIGEM",
        body: "A captura não demonstra, sozinha, autenticidade ou integralidade.",
      },
      {
        label: "02",
        title: "PESSOAS",
        body: "Nomes, fotos e contexto podem identificar terceiros.",
      },
      {
        label: "03",
        title: "FINALIDADE",
        body: "Provar um fato não exige necessariamente publicar.",
      },
    ],
    sources: [
      official(
        "Código Civil, art. 21",
        "https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm",
      ),
      official(
        "Constituição Federal, art. 5º, X",
        "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm",
      ),
    ],
  },
  {
    id: "imagem-menor",
    type: "minor",
    profile: "@rotinavisivel",
    timestamp: "há 48 min",
    title: "Rosto, uniforme e localização aparecem juntos.",
    description:
      "Uma publicação cotidiana torna uma criança identificável e revela parte da rotina.",
    contentLabel: "PROTEÇÃO ESPECIAL",
    caption: "primeiro dia por aqui 💙",
    mediaAlt:
      "Composição abstrata que indica uniforme, localização e rosto ocultado, sem mostrar uma criança real.",
    topicSlug: "criancas-e-adolescentes",
    metrics: { likes: 688, comments: 54, shares: 118 },
    actions: [
      { id: "publish", label: "Publicar" },
      { id: "edit", label: "Remover identificação" },
      { id: "ask", label: "Ver contexto" },
      { id: "ignore", label: "Continuar rolando" },
    ],
    consequence: {
      headline: "Quando há menor, o cuidado aumenta.",
      summary:
        "Crianças e adolescentes têm proteção reforçada de imagem, identidade e privacidade.",
      context: "O melhor interesse continua central mesmo quando há participação de responsáveis.",
      legalTopics: ["ECA", "Imagem", "Privacidade", "Proteção integral"],
      risk: "high",
    },
    xray: [
      { label: "MENOR IDENTIFICÁVEL", value: "SIM", alert: true },
      { label: "ROTINA / LOCALIZAÇÃO", value: "VISÍVEL", alert: true },
      { label: "PERFIL", value: "ABERTO" },
      { label: "PROTEÇÃO", value: "ESPECIAL" },
    ],
    propagation: [
      {
        id: "minor-repost",
        kind: "repost",
        profile: "@bairronarede",
        timestamp: "agora",
        label: "REPUBLICADO",
        caption: "a rotina saiu do círculo original",
        metrics: { likes: 1400, comments: 88, shares: 304 },
        crop: "offset",
      },
      {
        id: "minor-location",
        kind: "commentary",
        profile: "@mapadodia",
        timestamp: "+ 6 min",
        label: "LOCALIZAÇÃO",
        caption: "detalhes diferentes passaram a formar um endereço",
        metrics: { likes: 2200, comments: 190, shares: 511 },
        crop: "compressed",
      },
    ],
    contextResult: {
      label: "PROTEÇÃO ESPECIAL",
      title: "A imagem também revela rotina.",
      body: "Rosto, uniforme e localização, quando combinados, ampliam a identificação. A proteção integral exige cautela reforçada.",
    },
    layers: [
      {
        label: "01",
        title: "IDENTIDADE",
        body: "A identificação pode resultar da soma de pequenos sinais.",
      },
      {
        label: "02",
        title: "ROTINA",
        body: "Uniforme e localização revelam mais do que a legenda.",
      },
      {
        label: "03",
        title: "PROTEÇÃO",
        body: "Crianças e adolescentes recebem proteção reforçada.",
      },
    ],
    sources: [
      official("ECA, arts. 17 e 18", "https://www.planalto.gov.br/ccivil_03/leis/l8069.htm"),
      official(
        "LGPD, art. 14",
        "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
      ),
    ],
  },
  {
    id: "deepfake-comprometedor",
    type: "deepfake",
    profile: "@frameaberto",
    timestamp: "há 1 h",
    title: "A imagem parece real. A origem, não.",
    description:
      "Um personagem fictício aparece dizendo algo que não disse. Não há fonte original.",
    contentLabel: "ORIGEM NÃO VERIFICADA",
    caption: "isso aconteceu mesmo?",
    mediaAlt:
      "Retrato gráfico fictício dividido em camadas para representar manipulação sintética.",
    topicSlug: "inteligencia-artificial",
    metrics: { likes: 3301, comments: 274, shares: 901 },
    actions: [
      { id: "share", label: "Compartilhar" },
      { id: "verify", label: "Verificar" },
      { id: "report", label: "Denunciar" },
      { id: "ignore", label: "Continuar rolando" },
    ],
    consequence: {
      headline: "A tecnologia mudou. Os direitos continuam ali.",
      summary: "Conteúdo manipulado pode envolver imagem, honra, privacidade e responsabilidade.",
      context:
        "A narrativa é fictícia; a interface não representa uma ferramenta real de detecção.",
      legalTopics: ["Imagem", "Honra", "IA", "Responsabilidade"],
      risk: "high",
    },
    xray: [
      { label: "CONTEÚDO SINTÉTICO", value: "INDÍCIOS NARRATIVOS", alert: true },
      { label: "PESSOA", value: "FICTÍCIA" },
      { label: "ORIGEM", value: "NÃO ENCONTRADA" },
      { label: "CONTEXTO", value: "MANIPULADO", alert: true },
    ],
    propagation: [
      {
        id: "deep-repost",
        kind: "repost",
        profile: "@agoraonline",
        timestamp: "agora",
        label: "REPOSTADO",
        caption: "a dúvida desapareceu da legenda",
        metrics: { likes: 8900, comments: 1800, shares: 3900 },
        crop: "close",
      },
      {
        id: "deep-news",
        kind: "news",
        profile: "@contexto24",
        timestamp: "+ 11 min",
        label: "REPERCUSSÃO",
        caption: "a imagem circulou como se fosse registro",
        metrics: { likes: 18100, comments: 3200, shares: 6600 },
        crop: "wide",
      },
      {
        id: "deep-cross",
        kind: "cross-platform",
        profile: "@telaseguinte",
        timestamp: "+ 18 min",
        label: "OUTRA PLATAFORMA",
        caption: "a origem ficou para trás",
        metrics: { likes: 27400, comments: 5100, shares: 9900 },
        crop: "compressed",
      },
    ],
    contextResult: {
      label: "CONTEÚDO SINTÉTICO / NARRATIVA FICTÍCIA",
      title: "Nenhuma publicação original foi encontrada.",
      body: "A experiência apresenta sinais fictícios de manipulação para fins educativos; não executa detecção real.",
    },
    layers: [
      {
        label: "01",
        title: "APARÊNCIA",
        body: "Parecer real não confirma que o registro aconteceu.",
      },
      {
        label: "02",
        title: "ORIGEM",
        body: "Sem fonte, data e contexto, a verificação permanece incompleta.",
      },
      {
        label: "03",
        title: "PESSOA",
        body: "Imagem e honra continuam relevantes diante da manipulação.",
      },
    ],
    sources: [
      official(
        "Código Civil, arts. 20 e 21",
        "https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm",
      ),
      official(
        "Constituição Federal, art. 5º, X",
        "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm",
      ),
    ],
  },
];

export const actionLabels: Record<FeedAction, string> = {
  share: "compartilhamento",
  repost: "repost",
  report: "denúncia",
  ignore: "não compartilhamento",
  ask: "pedido de contexto",
  publish: "publicação",
  edit: "edição",
  verify: "verificação",
  authority: "encaminhamento a autoridade",
};
