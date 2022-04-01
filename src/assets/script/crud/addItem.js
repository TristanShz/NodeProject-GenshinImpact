export function addItem(element) {
  const myInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(element),
  };
  console.log(JSON.stringify(element));
  fetch("/api/screenshots", myInit)
    .then(function (response) {
      if (response.ok) {
        console.log("element ajouté");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
