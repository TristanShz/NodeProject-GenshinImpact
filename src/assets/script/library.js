/*-------------DOM ELEMENTS-------------------------------*/
const libraryContent = document.querySelector("#libraryContent");
const addScreenshotButton = document.querySelector("#libraryContent button");
const addScreenshotForm = document.querySelector("#addScreenshotForm");
const closePopup = document.querySelector("#closePopup");

const description = document.querySelector("#description");
const imageUrl = document.querySelector("#imageUrl");
const imgContainer = document.querySelector("#imgContainer");
const modalContainer = document.querySelector("#modalImage");
/*-------------------------------------------------------*/
import { Modal } from "./Modal.js";
import { deleteItem } from "./crud/deleteItem.js";
import { readItems } from "./crud/readItems.js";
import { ScreenshotForm } from "./class/AddScreenshotForm.js";

/*------------------FORM POPUP CONTENT-------------------*/
let form = new ScreenshotForm();

//Open form popup
addScreenshotButton.addEventListener("click", () => form.open());
//Close form popup
form.closeButton.addEventListener("click", () => form.close());

//Check des input
form.author.input.addEventListener("input", (content) => {
  form.authorValidation(content.target.value);
});

form.description.input.addEventListener("input", (content) => {
  form.descriptionValidation(content.target.value);
});

form.imageUrl.input.addEventListener("input", (content) => {
  form.imageUrlValidation(content.target.value);
});

form.sendButton.addEventListener("click", (event) => {
  event.preventDefault();
  form.sendForm();
});
/*-------------------------------------------------------*/
let myModal;

let screenshotsList = await readItems();

screenshotsList.forEach((element) => {
  //Ajout de toutes les images dans la div #imgContainer
  imgContainer.appendChild(element.image);
  //Ecoute du clic sur chaque image
  element.image.addEventListener("click", () => {
    //Création et insertion de la modal dans le dom
    myModal = new Modal(element.author, element.description, element.url);
    myModal.open();

    //Suppression d'un element
    myModal.deleteModal.addEventListener("click", () => {
      let isConfirm = confirm("Are you sure to delete this screenshot ?");
      if (isConfirm) {
        deleteItem(element);
        myModal.close();
      }
    });
    //Au clique sur la croix on supprime tout les éléments enfants de la div modalContainer
    document.getElementById("closeModal").addEventListener("click", () => {
      myModal.close();
    });
  });
});
