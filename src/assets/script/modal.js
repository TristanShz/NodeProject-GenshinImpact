const modalContainer = document.querySelector("#modalImage");
const closeModal = document.querySelector("#closeModal");
const modalAuthor = document.querySelector("#modalAuthor");
const modalDescription = document.querySelector("#modalDescription p");
const modalImage = document.querySelector("#modalImage img");
const libraryContent = document.querySelector("#libraryContent");

export function modalDisplay(author, description, imageUrl) {
  console.log("author : ", author);
  console.log("description : ", description);
  console.log("url : ", imageUrl);
  modalContainer.style.display = "block";
  modalImage.setAttribute("src", imageUrl);
  modalAuthor.innerText = `Author : ${author}`;
  modalDescription.innerText = description;
  libraryContent.style.opacity = "0";

  closeModal.addEventListener("click", () => {
    modalContainer.style.display = "none";
    libraryContent.style.opacity = "1";
  });
}
