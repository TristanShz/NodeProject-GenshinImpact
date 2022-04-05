export async function addItem(form) {
  
  await fetch("/api/screenshots", {
    method: "POST",
    body: form,
  })
    .then(function (response) {
      if (response.ok) {
        console.log("element ajouté");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
