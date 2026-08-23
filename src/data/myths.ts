import type { Myth } from "./types";

export const myths: Myth[] = [
  {
    id: "m-internet",
    claim: "Se está na internet, posso usar.",
    verdict: "MITO",
    explanation:
      "Estar acessível não é estar licenciado. Conteúdo publicado continua tendo autor e, muitas vezes, uma pessoa retratada. Uso livre é exceção prevista em lei, não regra padrão da internet.",
    lawIds: ["lda-46", "cf-5-x"],
  },
  {
    id: "m-credito",
    claim: "Se eu der crédito, posso repostar.",
    verdict: "MITO",
    explanation:
      "Crédito é boa prática e atende ao direito moral de atribuição, mas não substitui a autorização prévia para usar a obra nem a autorização de quem aparece na imagem.",
    lawIds: ["lda-46"],
  },
  {
    id: "m-local-publico",
    claim: "Se a pessoa está em local público, posso publicar.",
    verdict: "DEPENDE",
    explanation:
      "O lugar é apenas um dos fatores. Pesa se a pessoa é o foco, se está identificável, qual a finalidade e se a publicação a expõe ao ridículo ou a constrangimento.",
    lawIds: ["cf-5-x", "cc-20"],
  },
  {
    id: "m-so-compartilhei",
    claim: "Se eu só compartilhei, não tenho responsabilidade.",
    verdict: "MITO",
    explanation:
      "Compartilhar amplia o dano e cria nova exposição. A lógica de corresponsabilidade entre quem produz e quem difunde é bem conhecida no direito brasileiro.",
    lawIds: ["cc-186-927", "cp-138-140"],
  },
  {
    id: "m-apagar",
    claim: "Apagar o post resolve tudo.",
    verdict: "MITO",
    explanation:
      "A remoção interrompe a circulação a partir dali, mas não desfaz o dano já causado nem elimina prints e cópias. E o histórico costuma continuar existindo como prova.",
    lawIds: ["cc-186-927", "mci-19-21"],
  },
  {
    id: "m-perfil-privado",
    claim: "No perfil privado eu posso postar qualquer coisa.",
    verdict: "MITO",
    explanation:
      "Público restrito ainda é público. Difamação em grupo fechado continua sendo difamação, e conteúdo privado vaza com facilidade.",
    lawIds: ["cp-138-140", "cc-21"],
  },
];
