export async function addItem(form) {
  let test = new FormData(form);
  console.log(test);
  await fetch("/api/screenshots", {
    method: "POST",
    body: new FormData(form),
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
