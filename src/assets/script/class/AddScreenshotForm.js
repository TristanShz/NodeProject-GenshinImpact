export class ScreenshotForm {
  constructor(screnshot) {
    this.div = document.querySelector("#addScreenshotForm");

    this.author = {
      div: document.querySelector("#author"),
      input: document.querySelector("#author input"),
      span: document.querySelector("#author span"),
    };

    this.description = {
      div: document.querySelector("#description"),
      input: document.querySelector("#description textarea"),
      span: document.querySelector("#description span"),
    };

    this.imageUrl = {
      div: document.querySelector("#imageUrl"),
      input: document.querySelector("#imageUrl input"),
      span: document.querySelector("#imageUrl span"),
    };

    this.closeButton = document.querySelector("#closePopup");

    this.imagePreview = new Image();
  }
  open() {
    this.div.style.display = "flex";
  }

  close() {
    this.div.style.display = "none";
  }

  formError(element, message) {
    element.input.style.border = "2px solid tomato";
    element.span.innerText = message;
  }

  formValid(element) {
    element.input.style.border = "2px solid green";
    element.span.innerText = "";
    return true;
  }

  authorValidation(content) {
    if (content.length > 15 || content.length === 0) {
      this.formError(this.author, "Veuillez saisir un nom valide");
    } else {
      this.formValid(this.author);
    }
  }

  descriptionValidation(content) {
    if (content.length > 100 || content.length === 0) {
      this.formError(
        this.description,
        "Veuillez saisir une description plus courte"
      );
    } else {
      this.formValid(this.description);
    }
  }

  imageUrlValidation(content) {
    let linkIsValid = /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(
      content
    );
    if (linkIsValid) {
      this.imagePreview.src = content;
    } else {
      this.formError(this.imageUrl, "Votre lien n'est pas valide");
      this.imagePreview.src = "";
    }
    if (this.imagePreview.width > 0 && this.imagePreview.height > 0) {
      this.formValid(this.imageUrl);
      this.imageUrl.div.appendChild(this.imagePreview);
    } else {
      this.formError(this.imageUrl, "Votre lien n'est pas valide");
      this.imagePreview.src = "";
    }
  }
}
