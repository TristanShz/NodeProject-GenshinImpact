export function updateItem(screenshot) {
  const myInit = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(screenshot),
  };

  fetch(`/api/screenshots/${screenshot.id}`, myInit)
    .then(function (response) {
      if (response.ok) {
        console.log("screenshot modifié");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
