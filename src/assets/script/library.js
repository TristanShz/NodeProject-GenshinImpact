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
import { Modal } from "./class/Modal.js";
import { deleteItem } from "./crud/deleteItem.js";
import { readItems } from "./crud/readItems.js";
import { ScreenshotForm } from "./class/ScreenshotForm.js";

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
    console.log(form.image.img.src);
  });
});

//Envoi du formulaire
form.formElement.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!form.isEditing) form.sendForm();
  else form.updateForm();
});
/*-------------------------------------------------------*/
let myModal;

//Appel de la fonction readItems qui retourne la liste de tout
//les éléments en base de données
let screenshotsList = await readItems();

screenshotsList.forEach((element) => {
  //Ajout de toutes les images dans le DOM
  imgContainer.appendChild(element.image);
  //Ecoute du clic sur chaque image
  element.image.addEventListener("click", () => {
    //Création et insertion de la modal dans le DOM
    myModal = new Modal(element.author, element.description, element.image);
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
        // location.href = "/library";
        // myModal.close();
      }
    });
    //Au clique sur la croix on supprime tout les éléments enfants de la div modalContainer
    document.getElementById("closeModal").addEventListener("click", () => {
      myModal.close();
    });
  });
});
