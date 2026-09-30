// Single source of truth for site-wide SEO details.
// Set NEXT_PUBLIC_SITE_URL in the hosting environment once a custom domain is in place.
const DEFAULT_SITE_URL = "https://brianwportfolio.netlify.app";

export const SITE = {
  name: "Brian Williams",
  url: (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, ""),
  jobTitle: "Full-Stack Developer",
  locale: "en_US",
  image: "/og-image.jpg",
  imageAlt: "Brian Williams, full-stack developer, with an illustrated portrait",
  social: {
    github: "https://github.com/bwilliams91",
    linkedin: "https://www.linkedin.com/in/brianwebdev/",
  },
};

// Pages that belong in the sitemap. Pages that are still placeholders are left out (and set to noindex).
export const SITEMAP_PAGES = [
  { path: "/", priority: "1.0" },
  { path: "/about", priority: "0.8" },
  { path: "/projects", priority: "0.9" },
  { path: "/fun", priority: "0.6" },
];

export const absoluteUrl = (path = "/") => `${SITE.url}${path === "/" ? "" : path}`;

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE.url}/#person`,
  name: SITE.name,
  jobTitle: SITE.jobTitle,
  url: SITE.url,
  sameAs: [SITE.social.github, SITE.social.linkedin],
  worksFor: { "@type": "Organization", name: "Georgia Department of Education" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Colorado Springs",
    addressRegion: "CO",
    addressCountry: "US",
  },
  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Vue.js",
    "PHP",
    "Three.js",
    "Web development",
    "Interactive web design",
    "Model Context Protocol",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  name: `${SITE.name} | ${SITE.jobTitle}`,
  url: SITE.url,
  author: { "@id": `${SITE.url}/#person` },
};
