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
    imgElmt.setAttribute("tabindex", "0");
    imgElmt.classList.add("media-elmts");
    article.appendChild(imgElmt);
  } else if (media.video) {
    const videoElmt = document.createElement("video");
    videoElmt.src = `assets/images/medias/${media.video}`;
    videoElmt.setAttribute("alt", media.title);
    videoElmt.setAttribute("tabindex", "0");
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

  if (media.isLiked) {
    likeButton.classList.add("liked");
  }

  likeButton.addEventListener("click", function () {
    if (!media.isLiked) {
      media.isLiked = true;
      media.likes += 1;
      likesCount.textContent = media.likes;
      likeButton.classList.add("liked");
    } else {
      media.isLiked = false;
      media.likes -= 1;
      likesCount.textContent = media.likes;
      likeButton.classList.remove("liked");
    }

    likesCount.textContent = media.likes;

    refreshTotalLikes();
  });

  return article;
}

function refreshTotalLikes() {
  const likesCountElmts = document.querySelectorAll(".likes-count");
  const totalLikesText = document.querySelector(".likes-container p");

  let totalLikes = 0;
  likesCountElmts.forEach((likeElmt) => {
    totalLikes += parseInt(likeElmt.textContent);
  });

  if (totalLikesText) {
    totalLikesText.textContent = totalLikes;
  }
}

export { mediaTemplate, refreshTotalLikes };
