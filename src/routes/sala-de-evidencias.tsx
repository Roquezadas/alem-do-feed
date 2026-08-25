import { createFileRoute } from "@tanstack/react-router";
import { EvidenceRoom } from "@/components/evidence/EvidenceRoom";

const title = "Sala de Evidências | Além do Feed";
const description =
  "Conecte conceitos, leis, jurisprudência e episódios para descobrir o que existe além do feed.";

export const Route = createFileRoute("/sala-de-evidencias")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/sala-de-evidencias" }],
  }),
  component: EvidenceRoom,
});
