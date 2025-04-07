function photographerTemplate(data) {
  const { name, id, city, country, portrait, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    // Création des liens vers les profil des photographes
    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${id}`);
    link.setAttribute("aria-label", `Voir le profil de ${name}`);
    article.appendChild(link);

    // Affiche les photos des portraits
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Portrait ${name}`);
    article.appendChild(img);
    link.appendChild(img); // Liaison du lien et de l'image

    // Affiche les titres
    const h2 = document.createElement("h2");
    h2.textContent = name;
    article.appendChild(h2);

    // Affiche les localisations
    const localisation = document.createElement("p");
    localisation.textContent = `${city}, ${country}`;
    localisation.classList.add("photographer-localisation");
    article.appendChild(localisation);

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
