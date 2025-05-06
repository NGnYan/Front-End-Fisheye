/**
 * Creates a photographer's profile card template
 * @param {Object} data Photographer's data containing name, id, city, country, portrait, tagline, and price
 * @returns {Object} An object containing the photographer's details and a function to create their profile card
 */
function photographerTemplate(data) {
  const { name, id, city, country, portrait, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  /**
   * Generates the DOM for the photographer's profile card
   *  @returns {HTMLElement} The article element representing the photographer's profile card
   */
  function getUserCardDOM() {
    const article = document.createElement("article");
    article.classList.add("photographer-infos");

    // Création des liens vers les profil des photographes
    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${id}`);
    link.setAttribute("aria-label", `Voir le profil de ${name}`);
    article.appendChild(link);

    // Affiche les photos des portraits
    const photographerPortrait = document.createElement("img");
    photographerPortrait.setAttribute("src", picture);
    photographerPortrait.setAttribute("alt", `Portrait ${name}`);
    article.appendChild(photographerPortrait);
    link.appendChild(photographerPortrait); // Liaison du lien et de l'image

    // Affiche les titres
    const h2 = document.createElement("h2");
    h2.textContent = name;
    article.appendChild(h2);

    // Affiche les localisations
    const localization = document.createElement("p");
    localization.textContent = `${city}, ${country}`;
    localization.classList.add("photographer-localization");
    article.appendChild(localization);

    // Affiche les taglines
    const taglineElement = document.createElement("p");
    taglineElement.textContent = tagline;
    article.appendChild(taglineElement);

    // Affiche les prix
    const priceElement = document.createElement("p");
    priceElement.textContent = `${price}€/jour`;
    priceElement.classList.add("photographer-price");
    article.appendChild(priceElement);

    return article;
  }

  return {
    name,
    picture,
    id,
    city,
    country,
    portrait,
    tagline,
    price,
    getUserCardDOM,
  };
}
