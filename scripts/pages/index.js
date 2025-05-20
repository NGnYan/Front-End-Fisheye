import { photographerTemplate } from "../templates/photographer.js";
import { getPhotographers } from "../utils/api.js";

// Selectors
const photographersSection = document.querySelector(".photographer_section");

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
    const { photographers } = await getPhotographers();
    displayData(photographers);
  } catch (error) {
    photographersSection.innerHTML = `<div class="error-id-container"><p class="error-id">${error.message}</p></div>`;
  }
}

init();
