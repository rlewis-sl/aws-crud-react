function ItemDetail({ item }) {
  return (
    <>
      <div>Name: {item.name}</div>
      <div>Cost: {item.cost}</div>
      <div>Weight: {item.weight}</div>
    </>
  );
}

export default ItemDetail;
