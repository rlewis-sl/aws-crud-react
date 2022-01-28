const BASE_URL = 'https://acnncd1npk.execute-api.eu-west-1.amazonaws.com/widgets'

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
