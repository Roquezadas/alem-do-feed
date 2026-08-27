import { createFileRoute } from "@tanstack/react-router";
import { ExperimentalFeed } from "@/components/ExperimentalFeed";

const title = "Feed Experimental | Além do Feed";
const description =
  "Tome uma decisão, acompanhe como um conteúdo se espalha e descubra o que existe além do seu clique.";

export const Route = createFileRoute("/feed-experimental")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/feed-experimental" }],
  }),
  component: ExperimentalFeed,
});
