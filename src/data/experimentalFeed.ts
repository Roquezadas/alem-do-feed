import type { FeedAction, ExperimentalScenario } from "./types";

const lawSource = (label: string, url: string) => ({ label, url });

export const experimentalScenarios: ExperimentalScenario[] = [
  {
    id: "video-constrangedor",
    type: "video",
    profile: "@voce.recebeu",
    timestamp: "há 12 min",
    title: "Você recebe este vídeo em um grupo.",
    description:
      "Uma pessoa aparece em uma situação extremamente constrangedora. O vídeo ainda não viralizou.",
    contentLabel: "VÍDEO RECEBIDO",
    metrics: { likes: 1284, comments: 87, shares: 312 },
    actions: [
      { id: "share", label: "Compartilhar" },
      { id: "repost", label: "Repostar" },
      { id: "ignore", label: "Não compartilhar" },
      { id: "report", label: "Denunciar" },
      { id: "ask", label: "Perguntar antes" },
    ],
    consequence: {
      headline: "O conteúdo não termina no seu clique.",
      summary: "Ao compartilhar, você amplia a circulação de um conteúdo que envolve outra pessoa.",
      context:
        "A análise depende do conteúdo, da finalidade, do alcance e dos direitos envolvidos.",
      legalTopics: ["Direito à imagem", "Honra", "Privacidade", "Responsabilidade"],
      risk: "attention",
    },
    layers: [
      {
        label: "CAMADA 01",
        title: "PUBLICAÇÃO",
        body: "Você recebeu e decidiu compartilhar o conteúdo.",
      },
      {
        label: "CAMADA 02",
        title: "PESSOA",
        body: "Existe uma pessoa identificável no conteúdo, em situação constrangedora.",
      },
      {
        label: "CAMADA 03",
        title: "DIREITOS",
        body: "Imagem, honra e privacidade podem entrar em discussão.",
      },
      {
        label: "CAMADA 04",
        title: "CONTEXTO",
        body: "Estar disponível em um grupo não transforma o conteúdo em livre de proteção.",
      },
      {
        label: "CAMADA 05",
        title: "CONSEQUÊNCIA",
        body: "A circulação pode ampliar significativamente o alcance e o dano.",
      },
    ],
    sources: [
      lawSource(
        "Código Civil, arts. 20 e 21",
        "https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm",
      ),
    ],
  },
  {
    id: "foto-evento",
    type: "photo",
    profile: "@seu.enquadramento",
    timestamp: "há 28 min",
    title: "Você tirou uma foto em um evento.",
    description:
      "Uma pessoa aparece claramente na imagem. Ela não é parte da organização do evento.",
    contentLabel: "FOTO DE EVENTO",
    metrics: { likes: 916, comments: 42, shares: 104 },
    actions: [
      { id: "publish", label: "Postar" },
      { id: "edit", label: "Cortar a pessoa" },
      { id: "ask", label: "Pedir autorização" },
      { id: "ignore", label: "Não publicar" },
    ],
    consequence: {
      headline: "Local público não é publicação livre.",
      summary: "A presença em um evento é só uma parte da análise.",
      context:
        "Pessoa como foco individualizado e cena coletiva recebem leituras diferentes; finalidade e exposição também importam.",
      legalTopics: ["Direito à imagem", "Consentimento", "Interesse público"],
      risk: "attention",
    },
    layers: [
      {
        label: "CAMADA 01",
        title: "PUBLICAÇÃO",
        body: "Uma imagem de evento parece uma lembrança simples.",
      },
      {
        label: "CAMADA 02",
        title: "PESSOA",
        body: "A pessoa está identificável e aparece como foco, não apenas incidentalmente.",
      },
      {
        label: "CAMADA 03",
        title: "DIREITO",
        body: "O Código Civil protege imagem e vida privada, mesmo em ambiente público.",
      },
      {
        label: "CAMADA 04",
        title: "CONTEXTO",
        body: "Cobertura coletiva, crítica, exposição vexatória e publicidade não são a mesma coisa.",
      },
      {
        label: "CAMADA 05",
        title: "CONSEQUÊNCIA",
        body: "Pedir autorização ou retirar o foco pode reduzir a exposição desnecessária.",
      },
    ],
    sources: [
      lawSource(
        "Constituição, art. 5º, X",
        "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm",
      ),
      lawSource(
        "Código Civil, art. 20",
        "https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm",
      ),
    ],
  },
  {
    id: "print-acusacao",
    type: "screenshot",
    profile: "@conversa.privada",
    timestamp: "há 41 min",
    title: "Você recebe uma conversa privada.",
    description:
      "O diálogo parece provar uma acusação importante. A conversa envolve outra pessoa identificável.",
    contentLabel: "PRINT PRIVADO",
    metrics: { likes: 421, comments: 31, shares: 76 },
    actions: [
      { id: "publish", label: "Publicar" },
      { id: "share", label: "Enviar para um amigo" },
      { id: "ignore", label: "Guardar" },
      { id: "authority", label: "Apresentar à autoridade" },
    ],
    consequence: {
      headline: "Prova e exposição são etapas diferentes.",
      summary:
        "Uma conversa pode ser apresentada para provar um fato sem ser publicada para expor alguém.",
      context:
        "Conteúdo verídico também pode envolver privacidade, intimidade, honra e dados pessoais.",
      legalTopics: ["Privacidade", "Intimidade", "Honra", "Prova"],
      risk: "high",
    },
    layers: [
      {
        label: "CAMADA 01",
        title: "PUBLICAÇÃO",
        body: "O print registra uma conversa que parecia restrita aos participantes.",
      },
      {
        label: "CAMADA 02",
        title: "PESSOA",
        body: "Nome, foto, voz e contexto podem identificar quem participou.",
      },
      {
        label: "CAMADA 03",
        title: "DIREITO",
        body: "Vida privada e honra não desaparecem porque o conteúdo parece provar algo.",
      },
      {
        label: "CAMADA 04",
        title: "CONTEXTO",
        body: "Apresentar a uma autoridade para defesa ou denúncia é diferente de publicar no feed.",
      },
      {
        label: "CAMADA 05",
        title: "CONSEQUÊNCIA",
        body: "A exposição pode gerar novo dano mesmo quando a conversa é verdadeira.",
      },
    ],
    sources: [
      lawSource(
        "Código Civil, art. 21",
        "https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm",
      ),
      lawSource(
        "Constituição, art. 5º, X",
        "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm",
      ),
    ],
  },
  {
    id: "meme-polemica",
    type: "meme",
    profile: "@contexto.em.disputa",
    timestamp: "há 1 h",
    title: "Uma pessoa conhecida está no centro de uma polêmica.",
    description: "Você encontra uma fotografia dela e cria um meme sobre o caso.",
    contentLabel: "MEME EM EDIÇÃO",
    metrics: { likes: 2380, comments: 196, shares: 512 },
    actions: [
      { id: "publish", label: "Publicar" },
      { id: "edit", label: "Editar o tom" },
      { id: "ignore", label: "Não publicar" },
      { id: "ask", label: "Usar sem identificar" },
    ],
    consequence: {
      headline: "Humor também precisa de contexto.",
      summary:
        "Crítica, sátira e humilhação pessoal podem receber tratamentos jurídicos diferentes.",
      context:
        "Interesse público, veracidade, finalidade comercial e excesso na exposição pesam na análise.",
      legalTopics: ["Imagem", "Honra", "Liberdade de expressão", "Interesse público"],
      risk: "attention",
    },
    layers: [
      {
        label: "CAMADA 01",
        title: "PUBLICAÇÃO",
        body: "O meme usa uma imagem reconhecível para comentar uma polêmica.",
      },
      {
        label: "CAMADA 02",
        title: "PESSOA",
        body: "Ser uma pessoa pública não elimina a proteção da vida privada.",
      },
      {
        label: "CAMADA 03",
        title: "DIREITO",
        body: "A liberdade de expressão convive com imagem, honra e dignidade.",
      },
      {
        label: "CAMADA 04",
        title: "CONTEXTO",
        body: "Crítica ligada à atuação pública não é automaticamente igual a ridicularização gratuita.",
      },
      {
        label: "CAMADA 05",
        title: "CONSEQUÊNCIA",
        body: "O uso pode exigir remoção ou reparação quando ultrapassa a crítica e causa dano.",
      },
    ],
    sources: [
      lawSource(
        "Constituição, arts. 5º, IV, IX e X",
        "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm",
      ),
      lawSource(
        "STF, ADI 4.815",
        "https://portal.stf.jus.br/processos/detalhe.asp?incidente=4271057",
      ),
    ],
  },
  {
    id: "imagem-menor",
    type: "minor",
    profile: "@protecao.prioritaria",
    timestamp: "há 2 h",
    title: "Uma criança aparece na publicação.",
    description: "A imagem mostra rosto, uniforme e localização. O perfil é aberto.",
    contentLabel: "PROTEÇÃO ESPECIAL",
    metrics: { likes: 688, comments: 54, shares: 118 },
    actions: [
      { id: "publish", label: "Publicar" },
      { id: "edit", label: "Remover identificação" },
      { id: "ask", label: "Consultar responsável" },
      { id: "ignore", label: "Não publicar" },
    ],
    consequence: {
      headline: "Quando há menor, o cuidado aumenta.",
      summary:
        "Crianças e adolescentes têm proteção reforçada de imagem, identidade e privacidade.",
      context:
        "A autorização de responsáveis não funciona como propriedade sobre a imagem e o melhor interesse continua central.",
      legalTopics: ["ECA", "Imagem", "Privacidade", "Proteção integral"],
      risk: "high",
    },
    layers: [
      {
        label: "CAMADA 01",
        title: "PUBLICAÇÃO",
        body: "A foto parece uma lembrança, mas revela mais do que o rosto.",
      },
      {
        label: "CAMADA 02",
        title: "PESSOA",
        body: "Rosto, escola e localização tornam a criança especialmente identificável.",
      },
      {
        label: "CAMADA 03",
        title: "DIREITO",
        body: "O ECA assegura proteção integral, imagem, identidade e privacidade.",
      },
      {
        label: "CAMADA 04",
        title: "CONTEXTO",
        body: "Finalidade, alcance, rotina exposta e possibilidade de dano precisam ser avaliados.",
      },
      {
        label: "CAMADA 05",
        title: "CONSEQUÊNCIA",
        body: "A melhor decisão pode ser não publicar ou retirar elementos identificadores.",
      },
    ],
    sources: [
      lawSource("ECA, arts. 17 e 18", "https://www.planalto.gov.br/ccivil_03/leis/l8069.htm"),
      lawSource(
        "LGPD, art. 14",
        "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
      ),
    ],
  },
  {
    id: "deepfake-comprometedor",
    type: "deepfake",
    profile: "@verifique.antes",
    timestamp: "há 3 h",
    title: "Uma imagem de IA parece mostrar alguém em situação comprometedora.",
    description:
      "A montagem é convincente. Você não sabe quem criou nem se o retratado autorizou qualquer uso.",
    contentLabel: "IMAGEM MANIPULADA",
    metrics: { likes: 3301, comments: 274, shares: 901 },
    actions: [
      { id: "share", label: "Compartilhar" },
      { id: "verify", label: "Verificar" },
      { id: "report", label: "Denunciar" },
      { id: "ignore", label: "Não compartilhar" },
    ],
    consequence: {
      headline: "A tecnologia mudou. Os direitos continuam ali.",
      summary:
        "Deepfake pode envolver imagem, honra, privacidade, desinformação e responsabilidade.",
      context:
        "O Brasil ainda não tem uma lei específica vigente de IA; aplicam-se as proteções já existentes.",
      legalTopics: ["Imagem", "Honra", "IA", "Responsabilidade"],
      risk: "high",
    },
    layers: [
      {
        label: "CAMADA 01",
        title: "PUBLICAÇÃO",
        body: "A imagem parece um registro, mas foi produzida ou alterada artificialmente.",
      },
      {
        label: "CAMADA 02",
        title: "PESSOA",
        body: "O rosto ou a voz reproduzidos podem tornar alguém identificável.",
      },
      {
        label: "CAMADA 03",
        title: "DIREITO",
        body: "Imagem, honra e privacidade são protegidas mesmo sem uma lei específica de deepfake.",
      },
      {
        label: "CAMADA 04",
        title: "CONTEXTO",
        body: "O PL 2338/2023 é proposta em tramitação, não fundamento vigente para decidir o caso.",
      },
      {
        label: "CAMADA 05",
        title: "CONSEQUÊNCIA",
        body: "Verificar, não ampliar e denunciar podem interromper uma circulação potencialmente danosa.",
      },
    ],
    sources: [
      lawSource(
        "Código Civil, arts. 20 e 21",
        "https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm",
      ),
      lawSource(
        "PL 2338/2023 · Senado",
        "https://www25.senado.leg.br/web/atividade/materias/-/materia/157233",
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
