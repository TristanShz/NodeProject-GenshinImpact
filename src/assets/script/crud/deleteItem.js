export function deleteItem(element) {
  const myInit = {
    method: "DELETE",
    mode: "cors",
    cache: "default",
  };

  fetch(`/api/screenshots/${element.id}`, myInit)
    .then(function (response) {
      if (response.ok) {
        console.log("Element supprimer");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
