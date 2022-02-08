const AWS_API_ID = 'vlao80eelj';
const BASE_URL = `https://${AWS_API_ID}.execute-api.eu-west-1.amazonaws.com/widgets`;

export async function getWidgetsAsync() {
    try {
        var response = await fetch(BASE_URL);
    } catch (e) {
        console.log(e);
        throw e;
    }
    return response.json();
}

export async function getWidgetAsync(id) {
    var response = await fetch(BASE_URL + '/' + id);
    return response.json();
}

export async function createWidget(widget) {
    var response = await fetch(BASE_URL, {
        method: 'POST',
        body: `{ 'name': '${widget.name}', 'cost': '${widget.cost}', 'weight': '${widget.weight}' }`
    });

    return response.json();
}
