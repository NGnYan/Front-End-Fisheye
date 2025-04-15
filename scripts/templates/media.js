function mediaTemplate(media) {
  const article = document.createElement("article");

  const mediaPictures = document.createElement("img");
  mediaPictures.src = `assets/media/${media.image}`;
  mediaPictures.setAttribute("alt", media.title);
  article.appendChild(mediaPictures);

  const imgTitle = document.createElement("h2");
  imgTitle.textContent = media.title;
  article.appendChild(imgTitle);

  return article;
}
