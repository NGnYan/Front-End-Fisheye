// Appel API
async function getPhotographers() {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  return data.photographers;
}

//  Affiche les infos du photographe dans la section
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerInfos = photographerTemplate(photographer);
    const userCardDOM = photographerInfos.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

// Initialise la page
async function init() {
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();
