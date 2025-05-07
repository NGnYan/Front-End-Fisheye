// Selectors
const photographersHeader = document.querySelector(".photograph-header");
const dropdownBtn = document.querySelector(".dropdown-btn");
const dropdownMenu = document.querySelector(".dropdown-menu");
const selectedOption = document.querySelector(".selected-option");
const chevronClose = document.querySelector(".chevron-close");
const chevronOpen = document.querySelector(".chevron-open");
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
  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }
  const data = await response.json();
  return data;
}

let filteredMedias = [];

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

  const localization = document.createElement("p");
  localization.textContent = `${photographer.city}, ${photographer.country}`;
  localization.classList.add("photographer-localization");
  photographerInfos.appendChild(localization);

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

// Dropdown

dropdownBtn.addEventListener("click", () => {
  const isExpanded = dropdownBtn.getAttribute("aria-expanded") === "true";

  dropdownBtn.setAttribute("aria-expanded", String(!isExpanded));

  if (isExpanded) {
    dropdownMenu.style.display = "none";
    chevronClose.style.display = "flex";
    chevronOpen.style.display = "none";
  } else {
    dropdownMenu.style.display = "flex";
    chevronClose.style.display = "none";
    chevronOpen.style.display = "flex";
  }
});

function handleFilterOnDropdown(element) {
  if (element.target.tagName.toLowerCase() === "li") {
    const clickedLi = element.target;
    const currentText = selectedOption.textContent;

    selectedOption.textContent = clickedLi.textContent;
    clickedLi.textContent = currentText;
  }
  const dropdownElmt = selectedOption.textContent;

  if (dropdownElmt === "Popularité") {
    filteredMedias.sort((a, b) => b.likes - a.likes);
  } else if (dropdownElmt === "Date") {
    filteredMedias.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (dropdownElmt === "Titre") {
    filteredMedias.sort((a, b) => a.title.localeCompare(b.title));
  }
  mediaSection.innerHTML = "";
  displayMedia(filteredMedias);
}

dropdownMenu.addEventListener("click", (element) => {
  handleFilterOnDropdown(element);
});

/**
 * Display photographer media (images and videos)
 * @param {Array} media Array of media objects
 */
function displayMedia(filteredMedias) {
  filteredMedias.forEach((mediaElmt) => {
    const mediaElmts = mediaTemplate(mediaElmt);
    const mediaElement = mediaElmts.querySelector(".media-elmts");
    mediaElement.addEventListener("click", () => {
      displayLightbox(mediaElmt, filteredMedias);
    });
    mediaSection.appendChild(mediaElmts);

    mediaElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        displayLightbox(mediaElmt, filteredMedias);
      }
    });
  });
}

/**
 * Displays photographer's price and likes
 * @param {Object} photographer Photographer object containing details
 * @param {Object} media Array of objects
 */
function displayPrice(photographer, media) {
  let totalLikes = 0;

  media.forEach((mediaInfos) => {
    totalLikes += mediaInfos.likes;
  });

  const likesContainer = document.createElement("div");
  likesContainer.classList.add("likes-container");
  infosBox.appendChild(likesContainer);

  const totalLikesText = document.createElement("p");
  totalLikesText.textContent = `${totalLikes}`;
  likesContainer.appendChild(totalLikesText);

  const likeIcon = document.createElement("i");
  likeIcon.classList.add("fa-solid", "fa-heart");
  likesContainer.appendChild(likeIcon);

  const priceText = document.createElement("p");
  priceText.textContent = `${photographer.price}€/jour`;
  infosBox.appendChild(priceText);
}

/**
 * Initializes the photographer's page
 * @return {void}  Modifies the page content
 */
async function init() {
  try {
    const photographerId = getPhotographerId();
    const { photographers, media } = await getPhotographers();
    const photographer = photographers.find((p) => p.id === photographerId);
    if (!photographer) {
      throw new Error(`Photographe ${photographerId} non trouvé`);
    }
    filteredMedias = media.filter((m) => m.photographerId === photographerId);
    filteredMedias.sort((a, b) => b.likes - a.likes);

    displayPhotographer(photographer);
    displayMedia(filteredMedias);
    refreshTotalLikes();
    displayPrice(photographer, filteredMedias);
    displayModalInfos(photographer);
  } catch (error) {
    photographersHeader.innerHTML = `<div class="error-id-container"><p class="error-id">${error.message}</p></div>`;
  }
}
init();

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const errorContainer = document.querySelector(".error-id-container");
    if (errorContainer) {
      errorContainer.remove();
    }
  }
});
