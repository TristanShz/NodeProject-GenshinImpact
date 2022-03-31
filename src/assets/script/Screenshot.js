export class Screenshot {
  constructor(id,author, desc, url) {
    this.id = id;
    this.author = author;
    this.description = desc;
    this.url = url;
    this.image = document.createElement("img");
    this.image.setAttribute("src", this.url);
  }
}
