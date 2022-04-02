const blurryContent = document.querySelector("#blurryContent");
import { addItem } from "../crud/addItem.js";
import { updateItem } from "../crud/updateItem.js";

export class ScreenshotForm {
  constructor() {
    this.div = document.querySelector("#addScreenshotForm");
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

    this.imageUrl = {
      div: document.querySelector("#imageUrl"),
      input: document.querySelector("#imageUrl input"),
      span: document.querySelector("#imageUrl span"),
      isValid: false,
    };

    this.closeButton = document.querySelector("#closePopup");

    this.imagePreview = new Image();

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
      this.imageUrl.input.value = screenshot.url;
      this.imageUrl.isValid = true;
      this.id = screenshot.id;
      console.log(this.id);
      this.sendButton.innerText = "Edit screenshot";
      this.isEditing = true;
    } else {
      this.formTitle.innerText = "Add your screenshot";
      this.author.input.value = "";
      this.description.input.value = "";
      this.imageUrl.input.value = "";
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

  imageUrlValidation(content) {
    if (this.imagePreview.src) this.imagePreview.removeAttribute("src");
    let linkIsValid = /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(
      content
    );

    if (linkIsValid) {
      this.imagePreview.src = content;
      if (this.imagePreview.width < 1000 || this.imagePreview.height < 600) {
        this.imagePreview.removeAttribute("src");
        this.inputError(this.imageUrl, "Votre image est trop petite");
      }
    }
    if (this.imagePreview.src) {
      this.inputValid(this.imageUrl);
      this.imageUrl.div.appendChild(this.imagePreview);
    } else {
      this.inputError(this.imageUrl, "Votre lien n'est pas valide");
      if (this.imageUrl.div.lastElementChild == this.imagePreview) {
        this.imageUrl.div.removeChild(this.imagePreview);
      }
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
      location.href = "/library";
    } else {
      console.log("erreur lors de l'envoie du formulaire");
    }
  }

  updateForm() {
    if (
      this.author.isValid &&
      this.description.isValid &&
      this.imageUrl.isValid
    ) {
      updateItem({
        author: this.author.input.value,
        description: this.description.input.value,
        imageUrl: this.imageUrl.input.value,
        id: this.id,
      });
      this.close();
      location.href = "/library";
    } else {
      console.log("erreur lors de l'envoie du formulaire");
    }
  }
}
