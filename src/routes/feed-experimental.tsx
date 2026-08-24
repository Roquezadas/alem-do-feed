import { createFileRoute } from "@tanstack/react-router";
import { ExperimentalFeed } from "@/components/ExperimentalFeed";

const title = "Feed Experimental | Além do Feed";
const description =
  "Tome decisões, veja como uma publicação pode se espalhar e descubra o que existe além do feed.";

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
