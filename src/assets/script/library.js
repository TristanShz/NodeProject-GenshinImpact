/*-------------DOM ELEMENTS-------------------------------*/
const addScreenshotButton = document.querySelector("#libraryContent button");
const imgContainer = document.querySelector("#imgContainer");
/*-------------------------------------------------------*/
import { Modal } from "./class/Modal.js";
import { deleteItem } from "./crud/deleteItem.js";
import { readItems } from "./crud/readItems.js";
import { ScreenshotForm } from "./class/ScreenshotForm.js";
import { Pagination } from "./class/Pagination.js";

/*------------------FORM POPUP CONTENT-------------------*/
let form = new ScreenshotForm();

//Ouverture du formulaire
addScreenshotButton.addEventListener("click", () => form.open());
//Fermeture du formulaire
form.closeButton.addEventListener("click", () => form.close());

//Check des inputs
form.author.input.addEventListener("input", (content) => {
  form.authorValidation(content.target.value);
});

form.description.input.addEventListener("input", (content) => {
  form.descriptionValidation(content.target.value);
});

form.image.input.addEventListener("change", (event) => {
  form.image.img.src = URL.createObjectURL(event.target.files[0]);
  form.image.img.addEventListener("load", () => {
    form.imageValidation(
      form.image.img.naturalWidth,
      form.image.img.naturalHeight
    );
  });
});

//Envoi du formulaire
form.formElement.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!form.isEditing) form.sendForm();
  else form.updateForm();
});
/*-------------------------------------------------------*/
const screenshotsList = await readItems();

const pagination = new Pagination(screenshotsList);
const myModal = new Modal(screenshotsList);

function setPage(page) {
  if (imgContainer.childElementCount > 0) {
    while (imgContainer.firstChild) {
      imgContainer.removeChild(imgContainer.lastChild);
    }
  }
  pagination.setCurrentPage(page).forEach((element) => {
    //Ajout de toutes les images dans le DOM
    imgContainer.appendChild(element.image);
    //Ecoute du clic sur chaque image
    element.image.addEventListener("click", () => {
      //Création et insertion de la modal dans le DOM
      myModal.setCurrentImage(element.index);
      myModal.open();

      //Edition d'un element
      myModal.editIcon.addEventListener("click", () => {
        myModal.close();
        form.open(element);
      });

      //Suppression d'un element
      myModal.deleteIcon.addEventListener("click", () => {
        let isConfirm = confirm("Are you sure to delete this screenshot ?");
        if (isConfirm) {
          deleteItem(element);
          location.href = "/library";
          myModal.close();
        }
      });
    });
  });

  //Au clique sur la croix on supprime tout les éléments enfants de la div modalContainer
  myModal.closeModal.addEventListener("click", () => {
    myModal.close();
  });

  //Changement d'image au clique sur les flèches
  myModal.arrowLeft.addEventListener("click", () => {
    myModal.previousImage();
  });
  myModal.arrowRight.addEventListener("click", () => {
    myModal.nextImage();
  });
}

setPage(1);

pagination.paginationElement.forEach((element) => {
  pagination.paginationDiv.append(element);
  element.addEventListener("click", () => {
    setPage(element.innerText);
  });
});
