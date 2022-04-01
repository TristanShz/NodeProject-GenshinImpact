import { addItem } from "../crud/addItem.js";

export class ScreenshotForm {
  constructor(screnshot) {
    this.div = document.querySelector("#addScreenshotForm");

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

    this.imageUrl = {
      div: document.querySelector("#imageUrl"),
      input: document.querySelector("#imageUrl input"),
      span: document.querySelector("#imageUrl span"),
      isValid: false,
    };

    this.closeButton = document.querySelector("#closePopup");

    this.imagePreview = new Image();

    this.sendButton = document.querySelector("#addScreenshotForm form button");
  }
  open() {
    this.div.style.display = "flex";
  }

  close() {
    this.div.style.display = "none";
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

  imageUrlValidation(content) {
    let linkIsValid = /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(
      content
    );
    if (linkIsValid) {
      this.imagePreview.src = content;
    } else {
      this.inputError(this.imageUrl, "Votre lien n'est pas valide");
      this.imagePreview.src = "";
    }
    if (this.imagePreview.width > 0 && this.imagePreview.height > 0) {
      this.inputValid(this.imageUrl);
      this.imageUrl.div.appendChild(this.imagePreview);
    } else {
      this.inputError(this.imageUrl, "Votre lien n'est pas valide");
      this.imageUrl.div.removeChild(this.imagePreview);
      this.imagePreview.src = "";
    }
  }

  sendForm() {
    if (
      this.author.isValid &&
      this.description.isValid &&
      this.imageUrl.isValid
    ) {
      addItem({
        author: this.author.input.value,
        description: this.description.input.value,
        imageUrl: this.imageUrl.input.value,
      });
      this.close();
      location.href("/library");
    } else {
      console.log("erreur lors de l'envoie du formulaire");
    }
  }
}
