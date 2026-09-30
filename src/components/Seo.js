import React from "react";
import Head from "next/head";
import { SITE, absoluteUrl } from "@/lib/site";

// Per-page head tags: title, description, canonical, Open Graph, Twitter card and optional JSON-LD.
const Seo = ({ title, description, path = "/", noindex = false, jsonLd = [] }) => {
  const url = absoluteUrl(path);
  const image = `${SITE.url}${SITE.image}`;
  const structuredData = Array.isArray(jsonLd) ? jsonLd : [jsonLd];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content={SITE.locale} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={SITE.imageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={SITE.imageAlt} />

      {structuredData.map((data, index) => (
        <script
          key={`jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </Head>
  );
};

export default Seo;
