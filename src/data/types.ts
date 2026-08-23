export type RiskLevel = "permitido" | "depende" | "risco";

export type ContentType =
  | "episodio"
  | "lei"
  | "caso"
  | "pergunta"
  | "mito"
  | "artigo"
  | "bastidor"
  | "social";

export interface Episode {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  youtubeId?: string;
  spotifyUrl?: string;
  instagramUrl?: string;
  coverImage?: string;
  date: string;
  duration?: string;
  topics: string[];
  lawIds: string[];
  caseIds: string[];
  tags: string[];
}

export interface Law {
  id: string;
  category:
    | "Constituição Federal"
    | "Código Civil"
    | "Código Penal"
    | "LGPD"
    | "Marco Civil da Internet"
    | "ECA"
    | "Lei de Direitos Autorais";
  name: string;
  article: string;
  title: string;
  summary: string;
  text: string;
  sourceUrl: string;
}

export interface Case {
  id: string;
  court: "STF" | "STJ";
  process: string;
  date: string;
  title: string;
  theme: string;
  legalIssue: string;
  decision: string;
  whyItMatters: string;
  sourceUrl: string;
  verified: boolean;
}

export interface Question {
  id: string;
  question: string;
  status: RiskLevel;
  shortAnswer: string;
  reasoning: string;
  references: string[];
  lawIds: string[];
  tags: string[];
}

export interface Myth {
  id: string;
  claim: string;
  verdict: "MITO" | "DEPENDE" | "VERDADE";
  explanation: string;
  lawIds: string[];
}

export interface Topic {
  id: string;
  slug: string;
  name: string;
  definition: string;
  legalBasis: string;
  example: string;
  lawIds: string[];
  caseIds: string[];
  episodeIds: string[];
}

export interface FeedItem {
  id: string;
  type: ContentType;
  date: string;
  label: string;
  title: string;
  summary: string;
  layerContext: string;
  layerLaw: string;
  layerConsequence: string;
  href?: string;
  tags: string[];
}

export interface SocialPost {
  id: string;
  platform: "instagram" | "youtube" | "tiktok";
  kind: "reel" | "post" | "carrossel" | "video" | "short";
  caption: string;
  date: string;
  url: string;
  videoId?: string;
  thumbnail?: string;
  embeddable?: boolean;
}
