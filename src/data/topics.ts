import type { Topic } from "./types";

export const topics: Topic[] = [
  {
    id: "t-imagem",
    slug: "direito-a-imagem",
    name: "Direito à imagem",
    definition:
      "É o direito de controlar como o próprio rosto, corpo, voz e demais elementos identificadores são registrados e divulgados.",
    legalBasis: "Constituição, art. 5º, X; Código Civil, arts. 20 e 21.",
    example:
      "Um amigo publica um vídeo da festa em que você aparece dançando e a conta dele é monetizada.",
    lawIds: ["cf-5-x", "cc-20"],
    caseIds: ["stj-sumula-403", "stf-adi-4815"],
    episodeIds: ["ep-01"],
  },
  {
    id: "t-privacidade",
    slug: "privacidade",
    name: "Privacidade",
    definition:
      "Poder decidir o que da própria vida fica fora do alcance dos outros, inclusive na internet.",
    legalBasis: "Constituição, art. 5º, X; Código Civil, art. 21.",
    example: "Alguém publica a localização em tempo real de outra pessoa nos stories.",
    lawIds: ["cc-21", "cf-5-x"],
    caseIds: ["stf-re-1010606"],
    episodeIds: ["ep-01"],
  },
  {
    id: "t-honra",
    slug: "honra",
    name: "Honra",
    definition:
      "Reputação diante dos outros e o próprio sentimento de dignidade. Publicações podem atingir as duas dimensões.",
    legalBasis: "Constituição, art. 5º, X; Código Penal, arts. 138 a 140.",
    example: "Um post afirma que determinada pessoa cometeu um crime, sem qualquer prova.",
    lawIds: ["cp-138-140", "cf-5-x"],
    caseIds: ["stj-sumula-221"],
    episodeIds: ["ep-01"],
  },
  {
    id: "t-liberdade",
    slug: "liberdade-de-expressao",
    name: "Liberdade de expressão",
    definition:
      "Direito de manifestar pensamento, crítica, humor e informação — sem censura prévia, mas com responsabilidade posterior.",
    legalBasis: "Constituição, art. 5º, IV e IX.",
    example: "Uma crítica dura a uma decisão pública, publicada em vídeo.",
    lawIds: ["cf-5-iv-ix"],
    caseIds: ["stf-adi-4815", "stf-re-1010606"],
    episodeIds: ["ep-01"],
  },
  {
    id: "t-consentimento",
    slug: "consentimento",
    name: "Consentimento",
    definition:
      "Manifestação livre, informada e específica sobre um uso determinado. Não é genérico nem eterno, e pode ser revogado.",
    legalBasis: "LGPD, arts. 7º e 8º; Código Civil, art. 20.",
    example: "Autorizar uma foto no grupo da turma não autoriza a mesma foto em um anúncio.",
    lawIds: ["lgpd-7", "cc-20"],
    caseIds: ["stj-sumula-403"],
    episodeIds: ["ep-01"],
  },
  {
    id: "t-dados",
    slug: "protecao-de-dados",
    name: "Proteção de dados",
    definition:
      "Regras sobre coleta e uso de informações que identificam alguém — inclusive imagem, voz e localização.",
    legalBasis: "LGPD, arts. 4º, 5º e 7º.",
    example: "Um perfil com publicidade paga que publica rostos de clientes sem autorização.",
    lawIds: ["lgpd-7", "lgpd-4"],
    caseIds: [],
    episodeIds: ["ep-01"],
  },
  {
    id: "t-resp-civil",
    slug: "responsabilidade-civil",
    name: "Responsabilidade civil",
    definition:
      "Dever de reparar o dano causado a outra pessoa, inclusive dano exclusivamente moral.",
    legalBasis: "Código Civil, arts. 186 e 927.",
    example: "Uma publicação viraliza, a pessoa retratada perde oportunidades e pede indenização.",
    lawIds: ["cc-186-927"],
    caseIds: ["stj-sumula-221", "stj-sumula-403"],
    episodeIds: ["ep-01"],
  },
  {
    id: "t-crimes-honra",
    slug: "crimes-contra-a-honra",
    name: "Crimes contra a honra",
    definition:
      "Calúnia, difamação e injúria — condutas que podem acontecer inteiramente dentro de uma rede social.",
    legalBasis: "Código Penal, arts. 138 a 141.",
    example:
      "Um comentário que acusa alguém de furto em uma publicação com milhares de visualizações.",
    lawIds: ["cp-138-140"],
    caseIds: [],
    episodeIds: [],
  },
  {
    id: "t-autoral",
    slug: "direito-autoral",
    name: "Direito autoral",
    definition:
      "Proteção da obra criada: foto, texto, música, vídeo. Usar depende de autorização, salvo exceções legais.",
    legalBasis: "Lei 9.610/1998, arts. 29 e 46.",
    example: "Usar uma trilha inteira em um Reels comercial sem licença.",
    lawIds: ["lda-46"],
    caseIds: [],
    episodeIds: [],
  },
  {
    id: "t-criancas",
    slug: "criancas-e-adolescentes",
    name: "Crianças e adolescentes",
    definition:
      "Proteção reforçada da imagem e da identidade de quem tem menos de 18 anos, com prioridade absoluta.",
    legalBasis: "ECA, arts. 17 e 247; Constituição, art. 227.",
    example: "Postar o rosto e a escola de uma criança em conta aberta.",
    lawIds: ["eca-17-247"],
    caseIds: [],
    episodeIds: [],
  },
  {
    id: "t-intimo",
    slug: "conteudo-intimo",
    name: "Conteúdo íntimo",
    definition:
      "Registros de nudez ou de atos sexuais privados têm regime próprio, com resposta penal e remoção acelerada.",
    legalBasis: "Código Penal, arts. 216-B e 218-C; Marco Civil, art. 21.",
    example: "Encaminhar para um grupo uma foto íntima recebida em conversa privada.",
    lawIds: ["cp-216b", "mci-19-21"],
    caseIds: [],
    episodeIds: [],
  },
  {
    id: "t-ia",
    slug: "inteligencia-artificial",
    name: "Inteligência artificial",
    definition:
      "Rosto e voz gerados ou manipulados por IA continuam sendo atributos de uma pessoa real e seguem protegidos.",
    legalBasis: "Constituição, art. 5º, X; Código Civil, art. 20; LGPD.",
    example: "Criar um deepfake de um colega dizendo algo que ele nunca disse.",
    lawIds: ["cf-5-x", "cc-20", "lgpd-7"],
    caseIds: [],
    episodeIds: [],
  },
];

export const getTopic = (slug: string) => topics.find((t) => t.slug === slug);
