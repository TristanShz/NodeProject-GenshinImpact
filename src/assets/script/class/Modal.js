const modalBlock = document.querySelector("#modalBlock");
const blurryContent = document.querySelector("#blurryContent");
export class Modal {
  constructor(screenshotsList) {
    this.screenshotsList = screenshotsList;

    this.modalContainer = document.createElement("div");
    this.modalContainer.setAttribute("id", "modalImage");

    this.modalDescription = document.createElement("div");
    this.modalDescription.setAttribute("id", "modalDescription");

    this.modalImage = document.createElement("img");

    this.modalAuthor = document.createElement("h2");

    this.descriptionTitle = document.createElement("h2");
    this.descriptionTitle.innerText = "Description : ";

    this.descriptionText = document.createElement("p");

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
      this.modalAuthor,
      this.descriptionText,
      this.iconDescription
    );
    //Croix permettant de fermer la modal
    this.closeModal = document.createElement("i");
    this.closeModal.setAttribute("id", "closeModal");
    this.closeModalPng = document.createElement("img");
    this.closeModalPng.src = "../assets/images/close.png";
    this.closeModal.appendChild(this.closeModalPng);

    //Flèches permettants de naviguer entre les images
    this.arrowLeft = document.createElement("i");
    this.arrowLeft.setAttribute("class", "arrow");
    this.arrowLeft.innerHTML = "<img src='../assets/images/arrowLeft.png' />";

    this.arrowRight = document.createElement("i");
    this.arrowRight.setAttribute("class", "arrow");
    this.arrowRight.innerHTML = "<img src='../assets/images/arrowRight.png' />";

    this.modalContainer.append(
      this.modalImage,
      this.modalDescription,
      this.closeModal
    );
  }

  setCurrentImage(index) {
    this.currentIndex = index;
    this.author = this.screenshotsList[this.currentIndex].author;
    this.description = this.screenshotsList[this.currentIndex].description;
    this.modalImage.src = this.screenshotsList[this.currentIndex].image.src;

    this.modalAuthor.innerText = `Author : ${this.author}`;
    this.descriptionText.innerText = this.description;
  }

  open() {
    modalBlock.style.display = "flex";
    modalBlock.append(this.arrowLeft, this.modalContainer, this.arrowRight);
    blurryContent.style.display = "block";
  }

  close() {
    modalBlock.style.display = "none";
    let child = modalBlock.lastElementChild;
    while (child) {
      modalBlock.removeChild(child);
      child = modalBlock.lastElementChild;
    }
    blurryContent.style.display = "none";
  }

  previousImage() {
    if (this.currentIndex !== 0) {
      this.setCurrentImage(this.currentIndex - 1);
    } else this.setCurrentImage(this.screenshotsList.length - 1);
  }

  nextImage() {
    if (this.currentIndex !== this.screenshotsList.length - 1) {
      this.setCurrentImage(this.currentIndex + 1);
    } else this.setCurrentImage(0);
  }
}
