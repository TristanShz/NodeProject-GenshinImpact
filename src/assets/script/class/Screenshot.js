export class Screenshot {
  constructor(index, id, author, desc, image) {
    this.index = index;
    this.id = id;
    this.author = author;
    this.description = desc;
    this.image = document.createElement("img");
    this.image.setAttribute("src", "../assets/uploads/" + image);
  }
}
