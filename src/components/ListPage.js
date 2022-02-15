import { Link } from "react-router-dom";
import ItemList from "./ItemList";
import { getWidgetsAsync } from "../api/widgets";

function ListPage() {
  async function getWidgets() {
    try {
      return getWidgetsAsync();
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  return (
    <>
      <Link to="/new-widget">Create Widget</Link>
      <ItemList getItems={getWidgets} />
    </>
  );
}

export default ListPage;
