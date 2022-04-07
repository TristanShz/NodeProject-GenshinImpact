export async function updateItem(form, id) {
  await fetch(`/api/screenshots/${id}`, {
    method: "PUT",
    body: new FormData(form),
  })
    .then(function (response) {
      if (response.ok) {
        console.log("screenshot modifié");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
