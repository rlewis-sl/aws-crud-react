import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NewItem from "./NewItem";
import { createWidgetAsync } from "../api/widgets";

function NewItemPage() {
  const navigate = useNavigate();
  const [pageState, setPageState] = useState({});

  async function createItem(widget) {
    setPageState({ saving: true });
    await createWidgetAsync(widget);
    navigate("/widgets", { replace: true }); // 'replace: true' prevents the current route from being included in the browser history
  }

  if (pageState.saving) {
    return <div>Saving...</div>;
  } else {
    return (
      <>
        <Link to="/widgets">Back to list</Link>
        <NewItem createItem={createItem} />
      </>
    );
  }
}

export default NewItemPage;
