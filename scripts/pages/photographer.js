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

  const photographerInfos = photographerTemplate(photographer);
  const profilCardDOM = photographerInfos.getUserCardDOM();

  photographersHeader.appendChild(profilCardDOM);
}

// Affiche les photos des photographes
function displayMedia(media) {
  const mediaSection = document.querySelector(".media-section");

  media.forEach((media) => {
    const mediaElmt = mediaTemplate(media);
    mediaSection.appendChild(mediaElmt);
  });
}

// Initialise la page
async function init() {
  const photographerId = getPhotographerId();
  const { photographers, media } = await getPhotographers();
  const photographer = photographers.find((p) => p.id === photographerId);
  const medias = media.filter((m) => m.photographerId === photographerId);

  displayPhotographer(photographer);
  displayMedia(medias);
}

init();
