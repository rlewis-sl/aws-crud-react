import { WidgetContent } from "../model/widget";

function ItemDetail({ item }: { item: WidgetContent }) {
  return (
    <>
      <div>Name: {item.name}</div>
      <div>Cost: {item.cost}</div>
      <div>Weight: {item.weight}</div>
    </>
  );
}

export default ItemDetail;
