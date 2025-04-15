// Récupère l'ID du photographe depuis l'URL
function getPhotographerId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

// Appel API
async function getPhotographers() {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  return data.photographers;
}

// Affiche les infos du photographe dans le header
function displayPhotographer(photographer) {
  const photographersHeader = document.querySelector(".photograph-header");

  const photographerInfos = photographerTemplate(photographer);
  const userCardDOM = photographerInfos.getUserCardDOM();

  photographersHeader.appendChild(userCardDOM);
}

// Affiche les photos des photographes
function displayMedia(mediaArray) {
  const mediaSection = document.querySelector(".media-section");

  mediaArray.forEach((media) => {
    const mediaPicture = mediaTemplate(media);
    mediaSection.appendChild(mediaPicture);
  });
}

// Initialise la page
async function init() {
  const photographerId = getPhotographerId();
  const photographers = await getPhotographers();
  const mediaArray = await getPhotographers();
  const photographer = photographers.find((p) => p.id == photographerId);

  displayPhotographer(photographer);
  displayMedia(mediaArray);
}

init();
