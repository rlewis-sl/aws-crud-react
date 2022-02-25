import { Link } from "react-router-dom";
function Item({ item } : { item: {id:string, name:string, cost:number, weight:number}}) {
  return (
    <li>
      <Link to={`/widgets/${item.id}`}>{item.name}</Link>
    </li>
  );
}

export default Item;
