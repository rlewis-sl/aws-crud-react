const AWS_API_ID = "vlao80eelj";
const BASE_URL = `https://${AWS_API_ID}.execute-api.eu-west-1.amazonaws.com/widgets`;

export async function getWidgetsAsync() {
  let response;
  try {
    response = await fetch(BASE_URL);
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
  return response.json();
}

export async function getWidgetAsync(id) {
  const response = await fetch(BASE_URL + "/" + id);

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Failed to get item.");
  }
}

export async function createWidgetAsync(widget) {
  const name = widget.name;
  const cost = widget.cost;
  const weight = widget.weight;

  const response = await fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify({ name, cost, weight }),
  });

  return response.json();
}

export async function updateWidgetAsync(widget) {
  const id = widget.id;
  const name = widget.name;
  const cost = widget.cost;
  const weight = widget.weight;

  const response = await fetch(BASE_URL + "/" + id, {
    method: "PUT",
    body: JSON.stringify({ id, name, cost, weight }),
  });

  return response.json();
}

export async function deleteWidgetAsync(id) {
  await fetch(BASE_URL + "/" + id, {
    method: "DELETE",
  });
}
