// Récupère l'ID du photographe depuis l'URL
function getPhotographerId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

// Récupère les données des photographes
async function getPhotographers() {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  return data.photographers;
}

// Affiche les infos du photographe dans le header
function displayPhotographer(photographer) {
  const photographersHeader = document.querySelector(".photograph-header");

  const photographerModel = photographerTemplate(photographer);
  const userCardDOM = photographerModel.getUserCardDOM();

  photographersHeader.appendChild(userCardDOM);
}

// Initialise la page
async function init() {
  const photographerId = getPhotographerId();
  const photographers = await getPhotographers();
  const photographer = photographers.find((p) => p.id == photographerId);

  displayPhotographer(photographer);
}

init();
