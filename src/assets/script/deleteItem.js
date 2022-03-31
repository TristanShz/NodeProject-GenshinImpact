export function deleteItem(id) {
  const myHeaders = new Headers();

  const myInit = {
    method: "DELETE",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };

  fetch(`/api/screenshots/${id}`, myInit).then(function (response) {
    return response;
  });
}
