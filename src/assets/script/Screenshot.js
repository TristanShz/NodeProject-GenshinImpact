export class Screenshot {
  constructor(author, desc, url) {
    this.author = author;
    this.description = desc;
    this.url = url;
    this.image = document.createElement("img");
    this.image.setAttribute("src", this.url);
  }
}
