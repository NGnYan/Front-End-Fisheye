function mediaTemplate(media) {
  const article = document.createElement("article");

  const mediaPictures = document.createElement("img");
  mediaPictures.src = `assets/images/medias/${media.image}`;
  mediaPictures.setAttribute("alt", media.title);
  mediaPictures.classList.add("media-picture");
  article.appendChild(mediaPictures);

  const imgTitle = document.createElement("h2");
  imgTitle.textContent = media.title;
  imgTitle.classList.add("media-title");
  article.appendChild(imgTitle);

  return article;
}
