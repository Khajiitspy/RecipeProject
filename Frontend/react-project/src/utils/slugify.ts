export const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFKD") // normalize unicode
    .replace(/[^\p{L}\p{N}\s-]/gu, "") // keep letters (any language) & numbers
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
