export class Screenshot {
  constructor(author, desc, url) {
    this.author = author;
    this.description = desc;
    this.url = url;
  }

  createImage() {
    let image = document.createElement("img");
    image.setAttribute("src", this.url);
    return image;
  }
}
