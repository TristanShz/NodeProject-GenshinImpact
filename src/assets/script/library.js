/*-------------DOM ELEMENTS-------------------------------*/
const libraryContent = document.querySelector("#libraryContent");
const addScreenshotButton = document.querySelector("#libraryContent button");
const addScreenshotPopup = document.querySelector("#addScreenshotPopup");
const closePopup = document.querySelector("#closePopup");
const author = document.querySelector("#author");
const description = document.querySelector("#description");
const imageUrl = document.querySelector("#imageUrl");
const authorPreview = document.querySelector("#authorPreview #content");
const descriptionPreview = document.querySelector(
  "#descriptionPreview #content"
);
const imgPreview = document.querySelector("#imgPreview img");
const imgContainer = document.querySelector("#imgContainer");
const modalContainer = document.querySelector("#modalImage");
const deleteIcon = document.querySelector("#deleteItem");
const editIcon = document.querySelector("#editItem");
/*-------------------------------------------------------*/
import { Modal } from "./Modal.js";
import { deleteItem } from "./crud/deleteItem.js";
import { readItems } from "./crud/readItems.js";
/*------------------FORM POPUP CONTENT-------------------*/
//Open form popup
addScreenshotButton.addEventListener("click", () => {
  addScreenshotPopup.style.display = "flex";
});

//Close form popup

closePopup.addEventListener("click", () => {
  addScreenshotPopup.style.display = "none";
});

//Content Preview
author.addEventListener("input", (content) => {
  authorPreview.innerText = content.target.value;
});

description.addEventListener("input", (content) => {
  descriptionPreview.innerText = content.target.value;
});

imageUrl.addEventListener("input", (content) => {
  imgPreview.setAttribute("src", content.target.value);
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
