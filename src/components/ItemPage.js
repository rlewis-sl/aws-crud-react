import {useState} from 'react';
import {useParams} from 'react-router-dom';
import ItemDetail from './ItemDetail';
import {getWidgetAsync} from '../api/widgets';

function ItemPage() {
    const {widgetId} = useParams();

    function getItem() {
        return getWidgetAsync(widgetId);
    }

    const [itemState, setItemState] = useState({item: {}, loading: true})

    function handleError(error) {
        console.log(error);
        setItemState({error: error.message, loading: false});
    }
  
    if (itemState.loading) {
        getItem()
            .then(item => setItemState({item, loading: false}))
            .catch(error => handleError(error));
    }

    if (itemState.loading) {
        return ( <div>Loading...</div> );
    } else if (itemState.error) {
        return ( <div>ERROR: {itemState.error}</div> );
      } else {
        return ( <ItemDetail item={itemState.item} /> );
    }
}

export default ItemPage;