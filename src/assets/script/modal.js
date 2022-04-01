const modalContainer = document.querySelector("#modalImage");
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

    //Icone Edit
    this.editModal = document.createElement("i");
    this.editModalPng = document.createElement("img");
    this.editModal.setAttribute("id", "editItem");
    this.editModalPng.src = "../assets/images/edit.png";
    this.editModal.appendChild(this.editModalPng);

    //Icone Delete
    this.deleteModal = document.createElement("i");
    this.deleteModalPng = document.createElement("img");
    this.deleteModal.setAttribute("id", "deleteItem");
    this.deleteModalPng.src = "../assets/images/delete.png";
    this.deleteModal.appendChild(this.deleteModalPng);

    //Insertion des Icones Edit et Delete dans une div
    this.iconDescription = document.createElement("div");
    this.iconDescription.setAttribute("id", "iconDescription");
    this.iconDescription.append(this.editModal, this.deleteModal);

    //Création du bloc modalDescription
    this.modalDescription.append(
      this.descriptionTitle,
      this.author,
      this.description,
      this.iconDescription
    );
    //Croix permettant de fermer la modal
    this.closeModal = document.createElement("i");
    this.closeModalPng = document.createElement("img");
    this.closeModal.setAttribute("id", "closeModal");
    this.closeModalPng.src = "../assets/images/close.png";
    this.closeModal.appendChild(this.closeModalPng);
  }

  open() {
    modalContainer.style.display = "block";
    modalContainer.append(this.image, this.modalDescription, this.closeModal);
  }

  close() {
    modalContainer.style.display = "none";
    let child = modalContainer.lastElementChild;
    while (child) {
      modalContainer.removeChild(child);
      child = modalContainer.lastElementChild;
    }
  }
}
