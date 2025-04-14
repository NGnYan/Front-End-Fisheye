function photographerTemplate(data) {
  const { name, id, city, country, portrait, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    try {
      const article = document.createElement("article");
      article.classList.add("photographer-infos");

      // Création des liens vers les profil des photographes
      const photographerInfos = new URLSearchParams({ id });
      const link = document.createElement("a");
      link.setAttribute(
        "href",
        `photographer.html?${photographerInfos.toString()}`
      );
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
    } catch (error) {
      const errorMessage = document.createElement("h1");
      errorMessage.innerText =
        "Une erreur est survenue. Veuillez réessayer plus tard.";
      return errorMessage;
    }
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
