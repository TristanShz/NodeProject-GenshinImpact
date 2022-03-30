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
/*-------------------------------------------------------*/
import { Screenshot } from "./Screenshot.js";
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

const myHeaders = new Headers();

const myInit = {
  method: "GET",
  headers: myHeaders,
  mode: "cors",
  cache: "default",
};

let screenshotsList = [];
fetch("/api/screenshots", myInit)
  .then(function (screenshots) {
    return screenshots.json();
  })
  .then(function (screenshots) {
    screenshots.forEach((element) => {
      let newScreen = new Screenshot(
        element.author,
        element.description,
        element.imageUrl
      );
      screenshotsList.push(newScreen);
    });
    console.log(screenshotsList);
    screenshotsList.forEach((element) => {
      imgContainer.appendChild(element.createImage());
    });
  });
