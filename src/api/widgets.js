const AWS_API_ID = 'vlao80eelj';
const BASE_URL = `https://${AWS_API_ID}.execute-api.eu-west-1.amazonaws.com/widgets`;

export async function getWidgetsAsync() {
    let response;
    try {
        response = await fetch(BASE_URL);
    } catch (e) {
        console.log(e);
        throw e;
    }
    return response.json();
}

export async function getWidgetAsync(id) {
    const response = await fetch(BASE_URL + '/' + id);
    return response.json();
}

export async function createWidgetAsync(widget) {
    const name = widget.name;
    const cost = widget.cost;
    const weight = widget.weight;

    const response = await fetch(BASE_URL, {
        method: 'POST',
        body: `{ "name": "${name}", "cost": ${cost}, "weight": ${weight} }`
     });

    return response.json();
}

export async function updateWidgetAsync(widget) {
    const id = widget.id;
    const name = widget.name;
    const cost = widget.cost;
    const weight = widget.weight;

    const response = await fetch(BASE_URL + '/' + id, {
        method: 'PUT',
        body: `{ "id": "${id}", "name": "${name}", "cost": ${cost}, "weight": ${weight} }`
    });

    return response.json();
}
