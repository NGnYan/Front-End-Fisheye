/**
 * Creates a media element (images or videos) for display
 * @returns {HTMLElement} The DOM element representing the media item (image or video) and informations (title and like)
 */
function mediaTemplate(media) {
  const article = document.createElement("article");

  if (media.image) {
    const imgElmt = document.createElement("img");
    imgElmt.src = `assets/images/medias/${media.image}`;
    imgElmt.setAttribute("alt", media.title);
    imgElmt.classList.add("media-elmts");
    article.appendChild(imgElmt);
  } else if (media.video) {
    const videoElmt = document.createElement("video");
    videoElmt.src = `assets/images/medias/${media.video}`;
    videoElmt.setAttribute("alt", media.title);
    videoElmt.classList.add("media-elmts");
    article.appendChild(videoElmt);
  }

  // Medias informations
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("media-info");
  article.appendChild(infoDiv);

  const imgTitle = document.createElement("h2");
  imgTitle.textContent = media.title;
  imgTitle.classList.add("media-title");
  infoDiv.appendChild(imgTitle);

  // Like counter
  const likeContainer = document.createElement("div");
  likeContainer.classList.add("like-container");
  infoDiv.appendChild(likeContainer);

  const likesCount = document.createElement("span");
  likesCount.textContent = media.likes;
  likesCount.classList.add("likes-count");
  likeContainer.appendChild(likesCount);

  const likeButton = document.createElement("i");
  likeButton.classList.add("fa-solid", "fa-heart");
  likeButton.classList.add("like-button");
  likeContainer.appendChild(likeButton);

  let isLiked = false;

  likeButton.addEventListener("click", function () {
    if (!isLiked) {
      isLiked = true;
      likesCount.textContent = parseInt(likesCount.textContent) + 1;
      likeButton.classList.add("liked");
    } else {
      isLiked = false;
      likesCount.textContent = parseInt(likesCount.textContent) - 1;
      likeButton.classList.remove("liked");
    }
  });

  return article;
}
