const AWS_API_ID = "vlao80eelj";
const BASE_URL = `https://${AWS_API_ID}.execute-api.eu-west-1.amazonaws.com/widgets`;

export async function getWidgetsAsync() {
  const response = await fetch(BASE_URL);

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Failed to get item list");
  }
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

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Failed to create item.");
  }
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

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Failed to update item.");
  }
}

export async function deleteWidgetAsync(id) {
  const response = await fetch(BASE_URL + "/" + id, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete item.");
  }
}
