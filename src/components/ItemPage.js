import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail';
import ItemEdit from './ItemEdit';
import { getWidgetAsync, updateWidgetAsync } from '../api/widgets';

function ItemPage() {
    const {widgetId} = useParams();
    const [itemState, setItemState] = useState({item: {}, loading: true})

    function getItem() {
        return getWidgetAsync(widgetId);
    }

    function handleError(error) {
        console.log(error);
        setItemState({error: error.message, loading: false});
    }
  
    useEffect( () => {
        getItem()
            .then(item => setItemState({item, loading: false, editing: true}))
            .catch(error => handleError(error));
    }, []);

    async function saveItem(widget) {
        setItemState({ ...itemState, saving: true, loading: false, editing: false,});
        await updateWidgetAsync(widget);
        setItemState({item: widget});
    }

    if (itemState.loading) {
        return ( <div>Loading...</div> );
    } else if (itemState.saving) {
        return ( <div>Saving...</div>);
    } else if (itemState.error) {
        return ( <div>ERROR: {itemState.error}</div> );
      } else if (itemState.editing) {
        return ( <ItemEdit item={itemState.item} saveItem={saveItem} /> );
      } else {
        return ( <ItemDetail item={itemState.item} /> );
    }
}

export default ItemPage;