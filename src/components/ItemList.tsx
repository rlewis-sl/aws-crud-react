import { useEffect, useState } from "react";
import Item from "./Item";
import { Widget, WidgetCollection } from "../model/widget";

interface PageState {
  items: Widget[];
  error: any;
  loading: boolean;
}

function ItemList({ getItems } : { getItems:() => Promise<WidgetCollection>}) {
  const [listState, setListState] = useState<PageState>({
    items: [],
    error: null,
    loading: true,
  });

  function handleError(error: any) {
    console.log(error);
    setListState({ items: [], error: error.message, loading: false });
  }

  useEffect(() => {
    getItems()
      .then((data) =>
        setListState({ items: data.items, error: null, loading: false })
      )
      .catch((error) => handleError(error));
  }, [getItems]);

  if (listState.loading) {
    return <div>Loading...</div>;
  } else if (listState.error) {
    return <div>ERROR: {listState.error}</div>;
  } else {
    return (
      <ul>
        {listState.items.map((item: Widget, i) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    );
  }
}

export default ItemList;
