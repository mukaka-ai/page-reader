import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

const DEFAULT_DESCRIPTION = "Nairobi Taekwondo Association - Premier martial arts training in Kenya. Join our classes for kids, adults, and private lessons. Build discipline, fitness, and confidence.";
const DEFAULT_IMAGE = "/og-image.png";
const SITE_NAME = "Nairobi Taekwondo Association";

export function SEOHead({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = "taekwondo, martial arts, nairobi, kenya, self defense, kids classes, adult classes, fitness",
  ogImage = DEFAULT_IMAGE,
  ogType = "website",
  canonicalUrl,
}: SEOHeadProps) {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (meta) {
        meta.setAttribute("content", content);
      } else {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      }
    };

    updateMeta("description", description);
    updateMeta("keywords", keywords);
    updateMeta("og:title", fullTitle, true);
    updateMeta("og:description", description, true);
    updateMeta("og:type", ogType, true);
    updateMeta("og:image", ogImage, true);
    updateMeta("twitter:title", fullTitle);
    updateMeta("twitter:description", description);
    updateMeta("twitter:image", ogImage);

    // Update canonical URL
    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]');
      if (link) {
        link.setAttribute("href", canonicalUrl);
      } else {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        link.setAttribute("href", canonicalUrl);
        document.head.appendChild(link);
      }
    }

    return () => {
      // Reset title on unmount (optional)
    };
  }, [fullTitle, description, keywords, ogImage, ogType, canonicalUrl]);

  return null;
}
