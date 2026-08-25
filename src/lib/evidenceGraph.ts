import { cases } from "@/data/cases";
import { episodes } from "@/data/episodes";
import { getLaw } from "@/data/laws";
import { topics } from "@/data/topics";
import type { Case, Episode, Law, Topic } from "@/data/types";

export type EvidenceNodeType = "topic" | "law" | "case" | "episode" | "concept";

export type EvidenceNode = {
  id: string;
  type: EvidenceNodeType;
  title: string;
  subtitle?: string;
  description?: string;
  href?: string;
  topic?: Topic;
  law?: Law;
  case?: Case;
  episode?: Episode;
};

export type EvidenceEdge = {
  id: string;
  from: string;
  to: string;
  relationship: "fundamento" | "jurisprudencia" | "podcast" | "relacionado";
};

export type EvidenceGraph = {
  center: EvidenceNode;
  nodes: EvidenceNode[];
  edges: EvidenceEdge[];
};

const caseMap = new Map(cases.map((item) => [item.id, item]));
const episodeMap = new Map(episodes.map((item) => [item.id, item]));

function toLawNode(law: Law): EvidenceNode {
  return {
    id: `law:${law.id}`,
    type: "law",
    title: law.article,
    subtitle: law.title,
    description: law.summary,
    href: "/leis",
    law,
  };
}

function toCaseNode(item: Case): EvidenceNode {
  return {
    id: `case:${item.id}`,
    type: "case",
    title: item.court,
    subtitle: item.title,
    description: item.whyItMatters,
    href: "/jurisprudencia",
    case: item,
  };
}

function toEpisodeNode(item: Episode): EvidenceNode {
  return {
    id: `episode:${item.id}`,
    type: "episode",
    title: item.number,
    subtitle: item.title,
    description: item.subtitle,
    href: `/episodios/${item.slug}`,
    episode: item,
  };
}

function relatedTopicsFor(topic: Topic): Topic[] {
  return topics
    .filter((candidate) => candidate.id !== topic.id)
    .map((candidate) => {
      const shared = [
        ...candidate.lawIds.filter((id) => topic.lawIds.includes(id)),
        ...candidate.caseIds.filter((id) => topic.caseIds.includes(id)),
        ...candidate.episodeIds.filter((id) => topic.episodeIds.includes(id)),
      ];
      return { candidate, score: new Set(shared).size };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ candidate }) => candidate);
}

export function getTopicBySlug(slug: string) {
  return topics.find((topic) => topic.slug === slug);
}

export function buildEvidenceGraph(slug: string): EvidenceGraph | null {
  const topic = getTopicBySlug(slug);
  if (!topic) return null;

  const center: EvidenceNode = {
    id: `topic:${topic.id}`,
    type: "topic",
    title: topic.name,
    subtitle: "TÓPICO CENTRAL",
    description: topic.definition,
    href: "/entenda",
    topic,
  };

  const nodes: EvidenceNode[] = [];
  const edges: EvidenceEdge[] = [];

  for (const id of topic.lawIds) {
    const law = getLaw(id);
    if (!law) continue;
    const node = toLawNode(law);
    nodes.push(node);
    edges.push({
      id: `${center.id}->${node.id}`,
      from: center.id,
      to: node.id,
      relationship: "fundamento",
    });
  }

  for (const id of topic.caseIds) {
    const item = caseMap.get(id);
    if (!item) continue;
    const node = toCaseNode(item);
    nodes.push(node);
    edges.push({
      id: `${center.id}->${node.id}`,
      from: center.id,
      to: node.id,
      relationship: "jurisprudencia",
    });
  }

  for (const id of topic.episodeIds) {
    const item = episodeMap.get(id);
    if (!item) continue;
    const node = toEpisodeNode(item);
    nodes.push(node);
    edges.push({
      id: `${center.id}->${node.id}`,
      from: center.id,
      to: node.id,
      relationship: "podcast",
    });
  }

  for (const related of relatedTopicsFor(topic)) {
    const node: EvidenceNode = {
      id: `topic:${related.id}`,
      type: "concept",
      title: related.name,
      subtitle: "CONCEITO RELACIONADO",
      description: related.definition,
      href: `/sala-de-evidencias?topic=${encodeURIComponent(related.slug)}`,
      topic: related,
    };
    nodes.push(node);
    edges.push({
      id: `${center.id}->${node.id}`,
      from: center.id,
      to: node.id,
      relationship: "relacionado",
    });
  }

  return { center, nodes, edges };
}

export const evidenceTypeLabel: Record<EvidenceNodeType, string> = {
  topic: "TÓPICO",
  law: "LEI",
  case: "CASO",
  episode: "EPISÓDIO",
  concept: "CONCEITO",
};

export const evidenceRelationshipLabel: Record<EvidenceEdge["relationship"], string> = {
  fundamento: "FUNDAMENTO LEGAL",
  jurisprudencia: "JURISPRUDÊNCIA",
  podcast: "EXPLORADO NO PODCAST",
  relacionado: "CONCEITO RELACIONADO",
};
