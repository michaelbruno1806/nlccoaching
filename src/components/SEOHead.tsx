import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

const defaultSEO = {
  title: "NLC Coaching | Coach Sportif & Préparateur Physique à Lille",
  description: "NLC Coaching - Coach sportif et préparateur physique dans la métropole lilloise. Suivi personnalisé, coaching individuel, small groupes.",
  keywords: "coach sportif Lille, préparateur physique Wasquehal, coaching personnalisé, musculation",
  baseUrl: "https://nlccoaching.fr"
};

const SEOHead = ({ 
  title, 
  description, 
  keywords,
  canonical,
  ogImage,
  noindex = false
}: SEOHeadProps) => {
  const location = useLocation();
  
  const fullTitle = title 
    ? `${title} | NLC Coaching` 
    : defaultSEO.title;
  
  const fullDescription = description || defaultSEO.description;
  const fullKeywords = keywords || defaultSEO.keywords;
  const fullCanonical = canonical || `${defaultSEO.baseUrl}${location.pathname}`;
  const fullOgImage = ogImage || `${defaultSEO.baseUrl}/favicon.png`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', fullDescription);
    }
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', fullKeywords);
    }
    
    // Update canonical
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', fullCanonical);
    }
    
    // Update OG tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', fullTitle);
    }
    
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', fullDescription);
    }
    
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', fullCanonical);
    }
    
    let ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) {
      ogImageMeta.setAttribute('content', fullOgImage);
    }
    
    // Update Twitter tags
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', fullTitle);
    }
    
    let twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) {
      twitterDesc.setAttribute('content', fullDescription);
    }
    
    // Handle noindex
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      robotsMeta.setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow');
    }
    
  }, [fullTitle, fullDescription, fullKeywords, fullCanonical, fullOgImage, noindex]);

  return null;
};

export default SEOHead;
