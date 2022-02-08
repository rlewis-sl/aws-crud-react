
function ItemDetail({item}) {
    return (
        <ul>
            <li>Name: {item.name}</li>
            <li>Cost: {item.cost}</li>
            <li>Weight: {item.weight}</li>
        </ul>
    );
}

export default ItemDetail;