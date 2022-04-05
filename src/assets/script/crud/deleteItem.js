export function deleteItem(element) {
  const myHeaders = new Headers();

  const myInit = {
    method: "DELETE",
    headers: myHeaders,
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
