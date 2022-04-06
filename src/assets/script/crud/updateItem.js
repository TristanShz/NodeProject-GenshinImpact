export function updateItem(form, id) {
  const myInit = {
    method: "PUT",
    body: new FormData(form),
  };

  fetch(`/api/screenshots/${id}`, myInit)
    .then(function (response) {
      if (response.ok) {
        console.log("screenshot modifié");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
