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
