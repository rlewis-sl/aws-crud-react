import { Widget } from "../model/widget";
import { Link } from "react-router-dom";

function Item({ item }: { item: Widget }) {
  return (
    <li>
      <Link to={`/widgets/${item.id}`}>{item.name}</Link>
    </li>
  );
}

export default Item;
