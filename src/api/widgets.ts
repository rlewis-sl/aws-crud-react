import { Widget, WidgetId, WidgetContent } from "../model/widget";

const AWS_API_ID = "vlao80eelj";
const BASE_URL = `https://${AWS_API_ID}.execute-api.eu-west-1.amazonaws.com/widgets`;

export async function getWidgetsAsync(): Promise<Widget[]> {
  const response = await fetch(BASE_URL);

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Failed to get item list");
  }
}

export async function getWidgetAsync(id: WidgetId): Promise<Widget> {
  const response = await fetch(BASE_URL + "/" + id);

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Failed to get item.");
  }
}

export async function createWidgetAsync(widget: WidgetContent): Promise<WidgetId> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify(widget),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Failed to create item.");
  }
}

export async function updateWidgetAsync(widget: Widget): Promise<Widget> {
  const response = await fetch(BASE_URL + "/" + widget.id, {
    method: "PUT",
    body: JSON.stringify(widget),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Failed to update item.");
  }
}

export async function deleteWidgetAsync(id: WidgetId) {
  const response = await fetch(BASE_URL + "/" + id, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete item.");
  }
}
