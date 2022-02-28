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

function ItemPage() {
  const { widgetId } = useParams();
  const navigate = useNavigate();

  const emptyItem: Widget = { id: "", name: "", cost: 0, weight: 0 };
  const [itemState, setItemState] = useState(emptyItem);
  const [pageState, setPageState] = useState({
    error: "",
    loading: true,
    editing: false,
    saving: false,
    deleting: false,
    display: false,
  });

  function handleError(error: any) {
    console.log(error);
    setPageState({
      error: error.message,
      loading: false,
      editing: false,
      saving: false,
      deleting: false,
      display: false,
    });
  }

  useEffect(() => {
    widgetId &&
      getWidgetAsync(widgetId)
        .then((item) => {
          setItemState(item);
          setPageState((state) => ({
            ...state,
            loading: false,
            editing: true,
            saving: false,
            deleting: false,
            display: false,
          }));
        })
        .catch((error) => handleError(error));
  }, [widgetId]);

  async function saveItem(widget: Widget) {
    setPageState({
      ...pageState,
      loading: false,
      editing: false,
      saving: true,
      deleting: false,
      display: false,
    });
    const updatedItem = await updateWidgetAsync(widget);
    setItemState(updatedItem);
    setPageState({
      ...pageState,
      loading: false,
      editing: false,
      saving: false,
      deleting: false,
      display: true,
    });
  }

  async function deleteItem(id: WidgetId) {
    setPageState({
      ...pageState,
      loading: false,
      editing: false,
      saving: false,
      deleting: true,
      display: false,
    });
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
      {pageState.error && <div>ERROR: {pageState.error}</div>}
      {pageState.loading && <div>Loading...</div>}
      {pageState.saving && <div>Saving...</div>}
      {pageState.deleting && <div>Deleting...</div>}
      {pageState.editing && (
        <>
          <Link to="/widgets">Back to list</Link>
          <ItemEdit item={itemState} saveItem={saveItem} />
          <button onClick={handleDeleteClick}>Delete</button>
        </>
      )}
      {pageState.display && (
        <>
          <Link to="/widgets">Back to list</Link>
          <ItemDetail item={itemState} />
        </>
      )}
    </>
  );
}

export default ItemPage;
