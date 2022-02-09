import {useEffect, useState} from 'react';
import Item from './Item';

function ItemList({getItems}) {

    const [listState, setListState] = useState({items: [], loading: true});

    function handleError(error) {
      console.log(error);
      setListState({error: error.message, loading: false});
    }

    useEffect( () => {
      getItems()
        .then(data => setListState({items: data.items, loading: false}))
        .catch(error => handleError(error));
    }, []);

    if (listState.loading) {
      return <div>Loading...</div>
    } else if (listState.error) {
      return <div>ERROR: {listState.error}</div>
    } else {

      return (
        <ul>
          {listState.items.map((item,i) => (
              <Item item={item} key={item.id} />
          ))}
        </ul>
      );
    }
  }
  
  export default ItemList;
  