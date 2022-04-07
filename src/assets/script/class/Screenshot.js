const imgContainer = document.querySelector("#imgContainer");

export class Screenshot {
  constructor(id, author, desc, image) {
    this.id = id;
    this.author = author;
    this.description = desc;
    this.image = document.createElement("img");
    this.image.setAttribute("src", "../uploads/" + image);
  }
}
