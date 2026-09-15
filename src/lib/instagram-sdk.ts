export const INSTAGRAM_SCRIPT_URL = "https://www.instagram.com/embed.js";
const SCRIPT_ID = "adf-instagram-embed-sdk";
const SCRIPT_TIMEOUT = 12000;

interface InstagramEmbeds {
  process: () => void;
}

declare global {
  interface Window {
    instgrm?: { Embeds?: InstagramEmbeds };
  }
}

/** Aceita somente permalinks públicos; não encaminha query strings ao SDK. */
export function getInstagramPermalink(value: string): string | null {
  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      !["instagram.com", "www.instagram.com"].includes(url.hostname) ||
      url.username ||
      url.password ||
      url.port ||
      !/^\/(p|reel|tv)\/[A-Za-z0-9_-]+\/?$/.test(url.pathname)
    )
      return null;
    return `https://www.instagram.com${url.pathname.replace(/\/$/, "")}/`;
  } catch {
    return null;
  }
}

let pending: Promise<InstagramEmbeds> | null = null;

/** Compartilha uma única carga entre posts e navegações, sem executar nada no servidor. */
export function loadInstagramSdk(): Promise<InstagramEmbeds> {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return Promise.reject(new Error("Instagram embeds are client-only."));
  }
  const available = window.instgrm?.Embeds;
  if (typeof available?.process === "function") return Promise.resolve(available);
  if (pending) return pending;

  const request = new Promise<InstagramEmbeds>((resolve, reject) => {
    const existing = Array.from(document.scripts).find(
      (script) => script.src === INSTAGRAM_SCRIPT_URL,
    );
    const script = existing ?? document.createElement("script");
    let settled = false;
    const timeout = window.setTimeout(
      () => finish(new Error("Instagram script timed out.")),
      SCRIPT_TIMEOUT,
    );

    function finish(error?: Error) {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      script.removeEventListener("load", onLoad);
      script.removeEventListener("error", onError);
      const api = window.instgrm?.Embeds;
      if (error || typeof api?.process !== "function") {
        // Remover apenas nosso script com falha permite nova tentativa explícita.
        if (script.id === SCRIPT_ID) script.remove();
        reject(error ?? new Error("Instagram SDK unavailable."));
      } else {
        resolve(api);
      }
    }
    function onLoad() {
      finish();
    }
    function onError() {
      finish(new Error("Instagram script blocked."));
    }

    script.addEventListener("load", onLoad);
    script.addEventListener("error", onError);
    if (!existing) {
      script.id = SCRIPT_ID;
      script.async = true;
      script.src = INSTAGRAM_SCRIPT_URL;
      script.referrerPolicy = "strict-origin-when-cross-origin";
      document.head.appendChild(script);
    }
  });
  pending = request;
  void request.catch(() => {
    if (pending === request) pending = null;
  });
  return request;
}
