// Fonction pour récupérer l'ID du photographe à partir de l'URL
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

// Fonction pour afficher les informations du photographe en utilisant le template
function displayPhotographer(photographer) {
  const photographersHeader = document.querySelector(".photograph-header");

  // Utilisation du template pour obtenir le DOM du photographe
  const photographerModel = photographerTemplate(photographer);
  const userCardDOM = photographerModel.getUserCardDOM();

  // Ajout du DOM du photographe à la section header
  photographersHeader.appendChild(userCardDOM);
}

// Fonction principale pour initialiser la page
async function init() {
  const photographerId = getPhotographerId();
  const photographers = await getPhotographers();
  const photographer = photographers.find((p) => p.id == photographerId);

  if (photographer) {
    displayPhotographer(photographer);
  } else {
    console.error("Photographe non trouvé");
  }
}

init();
