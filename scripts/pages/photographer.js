// Selectors
const photographersHeader = document.querySelector(".photograph-header");
const mediaSection = document.querySelector(".media-section");
const infosBox = document.querySelector(".box-photographer");

/**
 * Retrieves the photographer's ID from the URL
 * @returns {number} The photographer's ID as a number
 */
function getPhotographerId() {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get("id"));
}

/**
 * API call
 * @returns {Promise<Object>} Array of objects
 */
async function getPhotographers() {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  return data;
}

let medias = [];

/**
 * Displays the photographer's information in the header
 *  @param {Object} photographer The photographer's data
 */
function displayPhotographer(photographer) {
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

/**
 * Display photographer media (images and videos)
 * @param {Array} media Array of media objects
 */
function displayMedia(media) {
  media.forEach((mediaElmt) => {
    const mediaElmts = mediaTemplate(mediaElmt);
    const mediaElement = mediaElmts.querySelector(".media-elmts");
    mediaElement.addEventListener("click", () => {
      displayLightbox(mediaElmt, medias);
    });
    mediaSection.appendChild(mediaElmts);
  });
}

/**
 * Displays photographer's price
 * @param {Object} photographer Photographer object containing details
 */
function displayPrice(photographer) {
  infosBox.classList.add("price-box");
  infosBox.textContent = `${photographer.price}€/jour`;
}

/**
 * Initializes the photographer's page
 * @return {void}  Modifies the page content
 */
async function init() {
  const photographerId = getPhotographerId();
  const { photographers, media } = await getPhotographers();
  const photographer = photographers.find((p) => p.id === photographerId);
  medias = media.filter((m) => m.photographerId === photographerId);

  displayPhotographer(photographer);
  displayMedia(medias);
  displayPrice(photographer);
  displayModalInfos(photographer);
}

init();
