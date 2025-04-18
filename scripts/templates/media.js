function mediaTemplate(media) {
  const article = document.createElement("article");

  if (media.image) {
    const mediaElmts = document.createElement("img");
    mediaElmts.src = `assets/images/medias/${media.image}`;
    mediaElmts.setAttribute("alt", media.title);
    mediaElmts.classList.add("media-elmts");
    article.appendChild(mediaElmts);
  } else if (media.video) {
    const mediaElmts = document.createElement("video");
    mediaElmts.src = `assets/images/medias/${media.video}`;
    mediaElmts.setAttribute("alt", media.title);
    mediaElmts.classList.add("media-elmts");
    article.appendChild(mediaElmts);
  }

  const imgTitle = document.createElement("h2");
  imgTitle.textContent = media.title;
  imgTitle.classList.add("media-title");
  article.appendChild(imgTitle);

  return article;
}
