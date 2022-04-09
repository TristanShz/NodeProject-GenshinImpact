export class Pagination {
  constructor(screenshotsList) {
    this.screenshotsList = screenshotsList;
    this.screenshotsByPage = 12;
    this.maxPossiblePages = Math.ceil(
      this.screenshotsList.length / this.screenshotsByPage
    );
    this.currentPage = 1;

    this.paginationDiv = document.querySelector("#pagination");
    this.paginationElement = [];

    for (let i = 0; i < this.maxPossiblePages; i++) {
      const pageElement = document.createElement("a");
      pageElement.innerText = i + 1;
      this.paginationElement.push(pageElement);
    }

    this.paginationElement.forEach((element) => {
      this.paginationDiv.append(element);
    });
  }

  setCurrentPage(page) {
    this.paginationDiv.children[this.currentPage - 1].className = "";
    this.currentPage = page;
    this.paginationDiv.children[this.currentPage - 1].className = "selected";
    return this.screenshotsList.slice(
      (this.currentPage - 1) * this.screenshotsByPage,
      this.currentPage * this.screenshotsByPage
    );
  }
}
