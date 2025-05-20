import { getPhotographers } from "../utils/api.js";

// Selectors
const lightbox = document.querySelector(".lightbox");
const lightboxContent = document.getElementById("lightbox-content");
const previousButton = document.querySelector("#lightbox-prev");
const nextButton = document.querySelector("#lightbox-next");

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
    videoElmt.setAttribute("tabindex", "0");
    videoElmt.classList.add("lightbox-media");

    // Keyboard navigation to play or stop video
    videoElmt.addEventListener("keydown", (event) => {
      event.preventDefault();
      if (event.key === "Enter") {
        if (videoElmt.paused) {
          videoElmt.play();
        } else {
          videoElmt.pause();
        }
      }
    });

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
    const currentIndex = medias.findIndex(
      (media) => media.id === currentMediaElmt.id
    );
    let newIndex;
    if (currentIndex === medias.length - 1) {
      newIndex = 0;
    } else {
      newIndex = currentIndex + 1;
    }
    currentMediaElmt = medias[newIndex];
    refreshLightbox(currentMediaElmt);
  });

  previousButton.addEventListener("click", () => {
    const currentIndex = medias.findIndex(
      (media) => media.id === currentMediaElmt.id
    );
    let newIndex;
    if (currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else {
      newIndex = medias.length - 1;
    }
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

// Keyboard navigation to move around the media
document.addEventListener("keydown", (event) => {
  if (lightbox.style.display === "flex") {
    if (event.key === "ArrowRight") {
      nextButton.click();
    } else if (event.key === "ArrowLeft") {
      previousButton.click();
    } else if (event.key === "Escape") {
      closeLightbox();
    }
  }
});

window.closeLightbox = closeLightbox;

export { displayLightbox, getPhotographers };
