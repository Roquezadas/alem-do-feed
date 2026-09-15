import { useState } from "react";
import type { SocialPost } from "@/data/types";

/** Apenas capas verificadas; uma imagem indisponível não deixa ícone quebrado. */
export function InstagramPreview({ preview }: { preview: NonNullable<SocialPost["preview"]> }) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  if (failedSrc === preview.src) return null;

  return (
    <img
      src={preview.src}
      alt={preview.alt}
      width={preview.width}
      height={preview.height}
      loading="lazy"
      decoding="async"
      onError={() => setFailedSrc(preview.src)}
      className="mt-6 h-auto w-full border object-contain"
    />
  );
}
