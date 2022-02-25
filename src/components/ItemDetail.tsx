function ItemDetail({ item } : { item:any}) {
  return (
    <>
      <div>Name: {item.name}</div>
      <div>Cost: {item.cost}</div>
      <div>Weight: {item.weight}</div>
    </>
  );
}

export default ItemDetail;
