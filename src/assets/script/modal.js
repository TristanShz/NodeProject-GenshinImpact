const modalContainer = document.querySelector("#modalImage");
const closeModal = document.querySelector("#closeModal");
const modalAuthor = document.querySelector("#modalAuthor");
const modalDescription = document.querySelector("#modalDescription");
const modalImage = document.querySelector("#modalImage img");
const libraryContent = document.querySelector("#libraryContent");

export class Modal {
  constructor(author, description, imageUrl) {
    this.image = document.createElement("img");
    this.image.src = imageUrl;

    this.modalDescription = document.createElement("div");
    this.modalDescription.setAttribute("id", "modalDescription");

    this.author = document.createElement("h2");
    this.author.innerText = `Author : ${author}`;

    this.descriptionTitle = document.createElement("h2");
    this.descriptionTitle.innerText = "Description : ";

    this.description = document.createElement("p");
    this.description.innerText = description;

    this.modalDescription.append(
      this.descriptionTitle,
      this.author,
      this.description
    );
    modalContainer.append(this.image, this.modalDescription);
  }

  close() {
    modalContainer.removeChild(
      this.closeModal,
      this.image,
      this.modalDescription
    );
  }
}
