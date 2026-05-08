// Centralized SEO meta helper for kijanaheri.com
const SITE_URL = "https://kijanaheri.com";
const DEFAULT_OG = `${SITE_URL}/og-image.jpg`;

interface SeoInput {
  title: string;
  description: string;
  path: string; // e.g. "/about"
  image?: string; // absolute or site-relative
  type?: "website" | "article" | "profile";
}

export function buildSeo({ title, description, path, image, type = "website" }: SeoInput) {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`
    : DEFAULT_OG;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:image", content: ogImage },
      { property: "og:site_name", content: "Kijanaheri Medical Centre" },
      { property: "og:locale", content: "en_KE" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export const SITE = { url: SITE_URL, name: "Kijanaheri Medical Centre" };
