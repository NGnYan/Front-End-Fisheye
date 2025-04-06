function photographerTemplate(data) {
  const { name, id, city, country, portrait, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const localisation = document.createElement("p");
    localisation.textContent = `${city}, ${country}`;

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(localisation);

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
