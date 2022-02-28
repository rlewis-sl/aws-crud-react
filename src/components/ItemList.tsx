import { useEffect, useState } from "react";
import Item from "./Item";
import { Widget } from "../model/widget";

function ItemList({ getItems }: { getItems: () => Promise<Widget[]> }) {
  const [listState, setListState] = useState({
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
      .then((data: any) =>
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
        {listState.items.map(
          (
            item: { id: string; name: string; cost: number; weight: number },
            i
          ) => (
            <Item item={item} key={item.id} />
          )
        )}
      </ul>
    );
  }
}

export default ItemList;
