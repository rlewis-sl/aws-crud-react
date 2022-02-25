import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NewItem from "./NewItem";
import { createWidgetAsync } from "../api/widgets";

function NewItemPage() {
  const navigate = useNavigate();
  const [pageState, setPageState] = useState({saving: false, dataEntry: true});

  async function createItem(widget: {name:string, cost:number, weight:number}) {
    setPageState({ saving: true, dataEntry: false });
    await createWidgetAsync(widget);
    navigate("/widgets", { replace: true }); // 'replace: true' prevents the current route from being included in the browser history
  }

  return (
    <>
      {pageState.saving && <div>Saving...</div>}
      {pageState.dataEntry && 
        <>
          <Link to="/widgets">Back to list</Link>
          <NewItem createItem={createItem} />
        </>
      }
    </>
  );
}

export default NewItemPage;
