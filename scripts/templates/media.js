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

  let isLiked = localStorage.getItem(`liked_${media.id}`) === "true";

  if (isLiked) {
    likeButton.classList.add("liked");
  }

  const savedLikes = localStorage.getItem(`likes_${media.id}`);
  if (savedLikes !== null) {
    media.likes = parseInt(savedLikes);
  }

  likeButton.addEventListener("click", function () {
    if (!isLiked) {
      isLiked = true;
      media.likes += 1;
      likesCount.textContent = media.likes;
      likeButton.classList.add("liked");
      localStorage.setItem(`liked_${media.id}`, "true");
    } else {
      isLiked = false;
      media.likes -= 1;
      likesCount.textContent = media.likes;
      likeButton.classList.remove("liked");
      localStorage.setItem(`liked_${media.id}`, "false");
    }

    likesCount.textContent = media.likes;
    localStorage.setItem(`likes_${media.id}`, media.likes.toString());

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
