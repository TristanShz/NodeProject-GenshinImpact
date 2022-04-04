const blurryContent = document.querySelector("#blurryContent");
import { addItem } from "../crud/addItem.js";
import { updateItem } from "../crud/updateItem.js";

export class ScreenshotForm {
  constructor() {
    this.div = document.querySelector("#addScreenshotForm");
    this.formElement = document.querySelector("#addScreenshotForm form");
    this.formTitle = document.querySelector("#addScreenshotForm h2");

    this.author = {
      div: document.querySelector("#author"),
      input: document.querySelector("#author input"),
      span: document.querySelector("#author span"),
      isValid: false,
    };

    this.description = {
      div: document.querySelector("#description"),
      input: document.querySelector("#description textarea"),
      span: document.querySelector("#description span"),
      isValid: false,
    };

    this.image = {
      div: document.querySelector("#imageUrl"),
      input: document.querySelector("#imageUrl input"),
      span: document.querySelector("#imageUrl").children[5],
      img: document.querySelector("#imageOutput"),
      isValid: false,
    };

    this.closeButton = document.querySelector("#closePopup");

    this.sendButton = document.querySelector("#addScreenshotForm form button");

    this.isEditing = false;
  }
  open(screenshot) {
    if (screenshot) {
      this.formTitle.innerText = "Edit screenshot";
      this.author.input.value = screenshot.author;
      this.author.isValid = true;
      this.description.input.value = screenshot.description;
      this.description.isValid = true;
      this.image.input.value = screenshot.url;
      this.image.isValid = true;
      this.id = screenshot.id;
      console.log(this.id);
      this.sendButton.innerText = "Edit screenshot";
      this.isEditing = true;
    } else {
      this.formTitle.innerText = "Add your screenshot";
      this.author.input.value = "";
      this.description.input.value = "";
      this.image.input.value = "";
      this.sendButton.innerText = "Add screenshot";
      this.isEditing = false;
    }
    this.div.style.display = "flex";
    blurryContent.style.display = "block";
  }

  close() {
    this.div.style.display = "none";
    blurryContent.style.display = "none";
  }

  inputError(element, message) {
    element.input.style.border = "2px solid tomato";
    element.span.innerText = message;
    element.isValid = false;
  }

  inputValid(element) {
    element.input.style.border = "2px solid green";
    element.span.innerText = "";
    element.isValid = true;
  }

  authorValidation(content) {
    if (content.length > 15 || content.length === 0) {
      this.inputError(this.author, "Veuillez saisir un nom valide");
    } else {
      this.inputValid(this.author);
    }
  }

  descriptionValidation(content) {
    if (content.length > 100 || content.length === 0) {
      this.inputError(
        this.description,
        "Veuillez saisir une description plus courte"
      );
    } else {
      this.inputValid(this.description);
    }
  }
  imageValidation(width, height) {
    console.log(width, height);
    if (width < 1000 || height < 600) {
      this.inputError(this.image, "Image trop petite");
    }
  }

  sendForm() {
    if (this.author.isValid && this.description.isValid && this.image.isValid) {
      addItem({
        author: this.author.input.value,
        description: this.description.input.value,
        imageUrl: this.image.input.value,
      });
      this.close();
      location.href = "/library";
    } else {
      console.log("erreur lors de l'envoie du formulaire");
    }
  }

  updateForm() {
    if (this.author.isValid && this.description.isValid && this.image.isValid) {
      updateItem({
        author: this.author.input.value,
        description: this.description.input.value,
        imageUrl: this.image.input.value,
        id: this.id,
      });
      this.close();
      location.href = "/library";
    } else {
      console.log("erreur lors de l'envoie du formulaire");
    }
  }
}
