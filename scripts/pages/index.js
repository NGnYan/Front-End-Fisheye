// Selectors
const photographersSection = document.querySelector(".photographer_section");

/**
 * API call
 * @returns {Promise<Object|null>} Array of objects
 */
async function getPhotographers() {
  const response = await fetch("./data/photographers.json");
  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }
  const data = await response.json();
  return data.photographers;
}

/**
 * Displays the photographer's information in the header
 *  @param {Object} photographer The photographer's data
 */
function displayData(photographers) {
  photographers.forEach((photographer) => {
    const photographerInfos = photographerTemplate(photographer);
    const userCardDOM = photographerInfos.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

/**
 * Initializes the index page
 * @return {void}  Modifies the page content
 */
async function init() {
  try {
    const photographers = await getPhotographers();
    displayData(photographers);
  } catch (error) {
    photographersSection.innerHTML = `<div class="error-id-container"><p class="error-id">${error.message}</p></div>`;
  }
}

init();
