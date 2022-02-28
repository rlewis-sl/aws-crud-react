import { Link } from "react-router-dom";
import ItemList from "./ItemList";
import {Widget} from "../model/widget";
import { getWidgetsAsync } from "../api/widgets";

function ListPage() {
  async function getWidgets(): Promise<Widget[]> {
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
