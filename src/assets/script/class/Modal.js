const modalContainer = document.querySelector("#modalImage");
const blurryContent = document.querySelector("#blurryContent");
export class Modal {
  constructor(author, description, image) {
    this.image = image;

    this.modalDescription = document.createElement("div");
    this.modalDescription.setAttribute("id", "modalDescription");

    this.author = document.createElement("h2");
    this.author.innerText = `Author : ${author}`;

    this.descriptionTitle = document.createElement("h2");
    this.descriptionTitle.innerText = "Description : ";

    this.description = document.createElement("p");
    this.description.innerText = description;

    //Icone Edit
    this.editIcon = document.createElement("i");
    this.editIconPng = document.createElement("img");
    this.editIcon.setAttribute("id", "editItem");
    this.editIconPng.src = "../assets/images/edit.png";
    this.editIcon.appendChild(this.editIconPng);

    //Icone Delete
    this.deleteIcon = document.createElement("i");
    this.deleteIconPng = document.createElement("img");
    this.deleteIcon.setAttribute("id", "deleteItem");
    this.deleteIconPng.src = "../assets/images/delete.png";
    this.deleteIcon.appendChild(this.deleteIconPng);

    //Insertion des Icones Edit et Delete dans une div
    this.iconDescription = document.createElement("div");
    this.iconDescription.setAttribute("id", "iconDescription");
    this.iconDescription.append(this.editIcon, this.deleteIcon);

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
    blurryContent.style.display = "block";
  }

  close() {
    modalContainer.style.display = "none";
    let child = modalContainer.lastElementChild;
    while (child) {
      modalContainer.removeChild(child);
      child = modalContainer.lastElementChild;
    }
    blurryContent.style.display = "none";
  }
}
