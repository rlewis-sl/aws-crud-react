import { Link } from "react-router-dom";
function Item({ item }) {
  return (
    <li>
      <Link to={`/widgets/${item.id}`}>{item.name}</Link>
    </li>
  );
}

export default Item;
