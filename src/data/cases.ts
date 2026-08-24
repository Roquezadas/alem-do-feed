import type { Case } from "./types";

/**
 * Jurisprudência: apenas decisões verificáveis, com link para a fonte oficial.
 * Nunca adicione um caso sem `sourceUrl` oficial e `verified: true`.
 */
export const cases: Case[] = [
  {
    id: "stf-re-1010606",
    court: "STF",
    process: "RE 1.010.606 / Tema 786",
    date: "11/02/2021",
    title: "Direito ao esquecimento é incompatível com a Constituição",
    theme: "Liberdade de expressão · Privacidade",
    legalIssue:
      "É possível impedir, com base na passagem do tempo, a divulgação de fatos verídicos e licitamente obtidos sobre uma pessoa?",
    decision:
      "O STF fixou que a ideia de um direito ao esquecimento é incompatível com a Constituição. Eventuais excessos ou abusos devem ser analisados caso a caso, à luz dos parâmetros constitucionais e da legislação civil e penal.",
    whyItMatters:
      "Publicar não deixa de ter consequências — mas também não existe um botão jurídico automático para apagar o passado de alguém da internet. O conflito se resolve no caso concreto.",
    sourceUrl: "https://portal.stf.jus.br/processos/detalhe.asp?incidente=5091603",
    verified: true,
  },
  {
    id: "stf-adi-4815",
    court: "STF",
    process: "ADI 4.815",
    date: "10/06/2015",
    title: "Biografias não dependem de autorização prévia",
    theme: "Imagem · Liberdade de expressão",
    legalIssue:
      "A publicação de biografias exige autorização prévia do biografado ou de familiares?",
    decision:
      "O STF declarou inexigível a autorização prévia para a publicação de biografias, dando interpretação conforme a Constituição aos arts. 20 e 21 do Código Civil, sem prejuízo de reparação por eventuais abusos.",
    whyItMatters:
      "Mostra que censura prévia é a exceção no sistema brasileiro: a resposta jurídica costuma vir depois, pela via da responsabilização, e não pelo bloqueio antecipado da publicação.",
    sourceUrl: "https://portal.stf.jus.br/processos/detalhe.asp?incidente=4271057",
    verified: true,
  },
  {
    id: "stf-re-1037396",
    court: "STF",
    process: "RE 1.037.396 / Tema 987",
    date: "26/06/2025",
    title: "Responsabilidade das plataformas por conteúdo de terceiros",
    theme: "Marco Civil da Internet · Responsabilidade",
    legalIssue:
      "O art. 19 do Marco Civil da Internet, que condiciona a responsabilidade das plataformas a ordem judicial prévia, é constitucional?",
    decision:
      "O STF concluiu o julgamento do Tema 987 declarando a inconstitucionalidade parcial do art. 19 e ampliando as hipóteses em que provedores respondem por conteúdo de terceiros, inclusive após notificação extrajudicial em determinados casos.",
    whyItMatters:
      "Muda o jogo de quem responde pelo que circula: a plataforma deixa de ser sempre a última da fila, e a notificação passa a ter peso jurídico maior.",
    sourceUrl: "https://portal.stf.jus.br/processos/detalhe.asp?incidente=5160549",
    verified: true,
  },
  {
    id: "stf-re-1057258",
    court: "STF",
    process: "RE 1.057.258 / Tema 533",
    date: "26/06/2025",
    title: "O regime das plataformas depende da natureza do conteúdo",
    theme: "Marco Civil da Internet · Remoção",
    legalIssue:
      "A regra do art. 19 do Marco Civil deve ser aplicada da mesma forma a todo conteúdo ilícito de terceiros?",
    decision:
      "No julgamento conjunto dos Temas 987 e 533, o STF declarou a inconstitucionalidade parcial e progressiva do art. 19 e estabeleceu trilhas diferentes de responsabilização, com notificação extrajudicial em hipóteses específicas, sem eliminar a análise do caso concreto.",
    whyItMatters:
      "A resposta para uma denúncia de nudez não consentida, conteúdo infantil, conta falsa ou ilícito em geral não é necessariamente a mesma para uma ofensa à honra.",
    sourceUrl:
      "https://portal.stf.jus.br/jurisprudenciaRepercussao/verAndamentoProcesso.asp?incidente=5217273&numeroProcesso=1057258&classeProcesso=RE&numeroTema=533",
    verified: true,
  },
  {
    id: "stf-re-1040515",
    court: "STF",
    process: "RE 1.040.515 / Tema 979",
    date: "26/04/2024",
    title: "Gravação ambiental e prova em matéria eleitoral",
    theme: "Prova · Comunicação",
    legalIssue:
      "A gravação ambiental feita por um dos interlocutores sem autorização judicial é sempre prova lícita?",
    decision:
      "Em matéria eleitoral, o STF fixou regime específico para gravação ambiental clandestina: a licitude depende do contexto, com ressalva para gravação realizada em local público sem controle de acesso.",
    whyItMatters:
      "Gravar uma conversa e publicar seu conteúdo são etapas diferentes; a exceção eleitoral impede transformar uma regra de prova em autorização geral para divulgar áudios.",
    sourceUrl:
      "https://portal.stf.jus.br/jurisprudenciaRepercussao/verAndamentoProcesso.asp?incidente=5173382&numeroProcesso=1040515&classeProcesso=RE&numeroTema=979",
    verified: true,
  },
  {
    id: "stj-sumula-403",
    court: "STJ",
    process: "Súmula 403",
    date: "28/10/2009",
    title: "Uso econômico da imagem gera dano, mesmo sem prejuízo comprovado",
    theme: "Direito à imagem · Dano moral",
    legalIssue:
      "É necessário provar prejuízo para haver indenização pelo uso não autorizado da imagem com fins econômicos?",
    decision:
      "Súmula 403: 'Independe de prova do prejuízo a indenização pela publicação não autorizada de imagem de pessoa com fins econômicos ou comerciais.'",
    whyItMatters:
      "Usar a foto de alguém em conteúdo monetizado, publicidade ou divulgação de marca é o cenário de risco mais direto — o dano é presumido.",
    sourceUrl: "https://scon.stj.jus.br/SCON/sumstj/",
    verified: true,
  },
  {
    id: "stj-sumula-221",
    court: "STJ",
    process: "Súmula 221",
    date: "1999",
    title: "Autor e veículo respondem pela publicação ofensiva",
    theme: "Honra · Responsabilidade civil",
    legalIssue: "Quem responde civilmente por uma publicação ofensiva?",
    decision:
      "Súmula 221: 'São civilmente responsáveis pelo ressarcimento de dano, decorrente de publicação pela imprensa, tanto o autor do escrito quanto o proprietário do veículo de divulgação.'",
    whyItMatters:
      "A lógica da corresponsabilidade ajuda a entender por que 'eu só compartilhei' raramente funciona como defesa absoluta.",
    sourceUrl: "https://scon.stj.jus.br/SCON/sumstj/",
    verified: true,
  },
];

export const getCase = (id: string) => cases.find((c) => c.id === id);
