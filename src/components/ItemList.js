import {useState} from 'react';
import Item from './Item';

function ItemList({getItems}) {

    const [listState, setListState] = useState({items: [], loading: true});

    function handleError(error) {
      console.log(error);
      setListState({error: error.message, loading: false});
    }

    if (listState.loading) {
        getItems()
            .then(data => setListState({items: data.items, loading: false}))
            .catch(error => handleError(error));
    }

    if (listState.loading) {
      return <div>Loading...</div>
    } else if (listState.error) {
      return <div>ERROR: {listState.error}</div>
    } else {

      return (
        <ul>
          {listState.items.map((o,i) => (
              <Item item={o} key={o.id} />
          ))}
        </ul>
      );
    }
  }
  
  export default ItemList;
  