import { Screenshot } from "../class/Screenshot.js";

export async function readItems() {
  let newItems = [];
  let response = await fetch("/api/screenshots", { method: "GET" });
  if (response.ok) {
    let screenshots = await response.json();
    await screenshots.forEach((element, index) => {
      newItems.push(
        new Screenshot(
          index,
          element._id,
          element.author,
          element.description,
          element.image
        )
      );
    });

    if (newItems) return newItems;
    else console.log("Erreur pendant le chargement des images");
  } else {
    alert("HTTP-Error: " + response.status);
  }
}
