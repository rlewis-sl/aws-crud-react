import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NewItem from "./NewItem";
import { WidgetContent } from '../model/widget';
import { createWidgetAsync } from "../api/widgets";

type PageStatus = "saving" | "dataEntry";

function NewItemPage() {
  const navigate = useNavigate();
  const [pageState, setPageState] = useState<PageStatus>("dataEntry");

  async function createItem(widget: WidgetContent) {
    setPageState("saving");
    await createWidgetAsync(widget);
    navigate("/widgets", { replace: true }); // 'replace: true' prevents the current route from being included in the browser history
  }

  return (
    <>
      {pageState === "saving" && <div>Saving...</div>}
      {pageState === "dataEntry" && 
        <>
          <Link to="/widgets">Back to list</Link>
          <NewItem createItem={createItem} />
        </>
      }
    </>
  );
}

export default NewItemPage;
