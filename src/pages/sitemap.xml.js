import { SITEMAP_PAGES, absoluteUrl } from "@/lib/site";

const buildSitemap = () => {
  const urls = SITEMAP_PAGES.map(
    ({ path, priority }) =>
      `  <url>\n    <loc>${absoluteUrl(path)}</loc>\n    <priority>${priority}</priority>\n  </url>`
  ).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};

// Rendered on request so the URLs always follow NEXT_PUBLIC_SITE_URL.
export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate");
  res.write(buildSitemap());
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
