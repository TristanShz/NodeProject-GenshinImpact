export function updateItem(form, id) {
  fetch(`/api/screenshots/${id}`, {
    method: "PUT",
    body: new FormData(form),
  });
  // .then(function (response) {
  //   if (response.ok) {
  //     console.log("screenshot modifié");
  //   }
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
}
