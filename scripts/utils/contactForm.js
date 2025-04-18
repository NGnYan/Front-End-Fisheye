function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function displayInfos(photographer) {
  photographerName = document.querySelector(".photographer-name");
  photographerName.textContent = photographer.name;
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}
