// Récupère l'ID du photographe depuis l'URL
function getPhotographerId() {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get("id"));
}

// Appel API
async function getPhotographers() {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  return data;
}

// Affiche les infos du photographe dans le header
function displayPhotographer(photographer) {
  const photographersHeader = document.querySelector(".photograph-header");

  const photographerInfos = document.createElement("div");
  photographerInfos.classList.add("photographers-infos");
  photographersHeader.appendChild(photographerInfos);

  const h2 = document.createElement("h2");
  h2.textContent = photographer.name;
  photographerInfos.appendChild(h2);

  const localisation = document.createElement("p");
  localisation.textContent = `${photographer.city}, ${photographer.country}`;
  localisation.classList.add("photographer-localisation");
  photographerInfos.appendChild(localisation);

  const taglineElement = document.createElement("p");
  taglineElement.textContent = `${photographer.tagline}`;
  photographerInfos.appendChild(taglineElement);

  const photographerPortrait = document.createElement("img");
  photographerPortrait.setAttribute(
    "src",
    `assets/photographers/${photographer.portrait}`
  );
  photographerPortrait.setAttribute("alt", `Portrait ${photographer.name}`);

  photographersHeader.appendChild(photographerPortrait);
}

// Affiche les photos des photographes
function displayMedia(media) {
  const mediaSection = document.querySelector(".media-section");

  media.forEach((media) => {
    const mediaElmts = mediaTemplate(media);
    mediaSection.appendChild(mediaElmts);
  });
}

// Affiche le prix
function displayPrice(photographer) {
  const priceBox = document.querySelector(".photographer-price");
  priceBox.classList.add("price-box");
  priceBox.textContent = `${photographer.price}€/jour`;
}

// Initialise la page
async function init() {
  const photographerId = getPhotographerId();
  const { photographers, media } = await getPhotographers();
  const photographer = photographers.find((p) => p.id === photographerId);
  const medias = media.filter((m) => m.photographerId === photographerId);

  displayPhotographer(photographer);
  displayMedia(medias);
  displayPrice(photographer);
  displayInfos(photographer);
}

init();
