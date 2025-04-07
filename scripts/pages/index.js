// Appel API
async function getPhotographers() {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  console.log(data.photographers);
  return data.photographers;
}

// Affiche les datas
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

// Récupère les datas des photographes
async function init() {
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();
