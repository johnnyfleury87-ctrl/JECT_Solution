/**
 * Utilitaires de traitement de texte
 * Pour garantir un affichage propre sans entités HTML
 */

/**
 * Décode les entités HTML dans une chaîne de caractères
 * Utile si du contenu provient d'une API/CMS externe
 * 
 * @param {string} str - La chaîne à décoder
 * @returns {string} - La chaîne décodée
 */
export function decodeHtmlEntities(str) {
  if (!str || typeof str !== 'string') return str;
  
  const entities = {
    '&apos;': "'",
    '&#39;': "'",
    '&quot;': '"',
    '&#34;': '"',
    '&nbsp;': ' ',
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
  };
  
  return str.replace(/&[a-z0-9#]+;/gi, (match) => entities[match] || match);
}

/**
 * Nettoie et normalise une chaîne de caractères
 * - Supprime les espaces multiples
 * - Trim les espaces de début/fin
 * - Décode les entités HTML
 * 
 * @param {string} str - La chaîne à nettoyer
 * @returns {string} - La chaîne nettoyée
 */
export function cleanText(str) {
  if (!str || typeof str !== 'string') return str;
  
  return decodeHtmlEntities(str)
    .replace(/\s+/g, ' ')
    .trim();
}
