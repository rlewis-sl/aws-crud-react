import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import ItemEdit from "./ItemEdit";
import { Widget, WidgetId } from "../model/widget";
import {
  getWidgetAsync,
  updateWidgetAsync,
  deleteWidgetAsync,
} from "../api/widgets";

type PageStatus = "error" | "loading" | "editing" | "saving" | "deleting" | "display";
interface PageState {
  status: PageStatus;
  message?: string;
}

function ItemPage() {
  const { widgetId } = useParams();
  const navigate = useNavigate();

  const emptyItem: Widget = { id: "", name: "", cost: 0, weight: 0 };
  const [itemState, setItemState] = useState(emptyItem);
  const [pageState, setPageState] = useState<PageState>({
    status: "loading"
  });

  function handleError(error: any) {
    console.log(error);
    setPageState({
      status: "error",
      message: error.message,
    });
  }

  useEffect(() => {
    widgetId &&
      getWidgetAsync(widgetId)
        .then((item) => {
          setItemState(item);
          setPageState({ status: "editing" });
        })
        .catch((error) => handleError(error));
  }, [widgetId]);

  async function saveItem(widget: Widget) {
    setPageState({ status: "saving" });
    const updatedItem = await updateWidgetAsync(widget);
    setItemState(updatedItem);
    setPageState({ status: "display" });
  }

  async function deleteItem(id: WidgetId) {
    setPageState({ status: "deleting" });
    setItemState(emptyItem);
    await deleteWidgetAsync(id);
    navigate("/widgets", { replace: true }); // 'replace: true' prevents the current route from being included in the browser history
  }

  const handleDeleteClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    deleteItem(itemState.id);
  };

  return (
    <>
      {pageState.status === "error" && <div>ERROR: {pageState.message}</div>}
      {pageState.status === "loading" && <div>Loading...</div>}
      {pageState.status === "saving" && <div>Saving...</div>}
      {pageState.status === "deleting" && <div>Deleting...</div>}
      {pageState.status === "editing" && (
        <>
          <Link to="/widgets">Back to list</Link>
          <ItemEdit item={itemState} saveItem={saveItem} />
          <button onClick={handleDeleteClick}>Delete</button>
        </>
      )}
      {pageState.status === "display" && (
        <>
          <Link to="/widgets">Back to list</Link>
          <ItemDetail item={itemState} />
        </>
      )}
    </>
  );
}

export default ItemPage;
