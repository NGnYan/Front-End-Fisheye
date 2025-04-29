// Selectors
const lightbox = document.querySelector(".lightbox");
const lightboxContent = document.getElementById("lightbox-content");
const previousButton = document.querySelector("#lightbox-prev");
const nextButton = document.querySelector("#lightbox-next");

/**
 * API call
 * @returns {Promise<Object>} Array of objects
 */
async function getPhotographers() {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  return data;
}

function refreshLightbox(mediaElmt) {
  lightboxContent.innerHTML = "";

  if (mediaElmt.image) {
    const imgElmt = document.createElement("img");
    imgElmt.src = `assets/images/medias/${mediaElmt.image}`;
    imgElmt.alt = mediaElmt.title;
    imgElmt.classList.add("lightbox-media");

    lightboxContent.appendChild(imgElmt);
  }

  if (mediaElmt.video) {
    const videoElmt = document.createElement("video");
    videoElmt.src = `assets/images/medias/${mediaElmt.video}`;
    videoElmt.alt = mediaElmt.title;
    videoElmt.setAttribute("controls", "controls");
    videoElmt.classList.add("lightbox-media");

    lightboxContent.appendChild(videoElmt);
  }

  lightbox.style.display = "flex";
}

/**
 * Making the lightbox visible on the screen
 * @return {void}
 */
function displayLightbox(mediaElmt, medias) {
  let currentMediaElmt = mediaElmt;
  refreshLightbox(currentMediaElmt);

  nextButton.addEventListener("click", () => {
    let currentIndex = medias.findIndex(
      (media) => media.id === currentMediaElmt.id
    );
    const newIndex = currentIndex === medias.length - 1 ? 0 : currentIndex + 1;
    currentMediaElmt = medias[newIndex];
    refreshLightbox(currentMediaElmt);
  });

  previousButton.addEventListener("click", () => {
    let currentIndex = medias.findIndex(
      (media) => media.id === currentMediaElmt.id
    );
    const newIndex = currentIndex === medias.length - 1 ? 0 : currentIndex - 1;
    currentMediaElmt = medias[newIndex];
    refreshLightbox(currentMediaElmt);
  });
}

/**
 * Making the lightbox hidden from the screen
 * @return {void}
 */
function closeLightbox() {
  lightbox.style.display = "none";
}
