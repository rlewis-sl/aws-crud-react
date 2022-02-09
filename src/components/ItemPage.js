import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail';
import ItemEdit from './ItemEdit';
import { getWidgetAsync, updateWidgetAsync } from '../api/widgets';

function ItemPage() {
    const {widgetId} = useParams();
    const [itemState, setItemState] = useState({});
    const [pageState, setPageState] = useState({error: '', loading: true, editing: false, saving: false});

    function getItem() {
        return getWidgetAsync(widgetId);
    }

    function handleError(error) {
        console.log(error);
        setPageState({error: error.message, loading: false, editing: false, saving: false});
    }
  
    useEffect( () => {
        getItem()
            .then(item => {
                setItemState(item);
                setPageState({...pageState, loading: false, editing: true, saving: false});
            })
            .catch(error => handleError(error));
    }, []);

    async function saveItem(widget) {
        setPageState({...pageState, editing: false, saving: true});
        const updatedItem = await updateWidgetAsync(widget);
        setItemState(updatedItem);
        setPageState({...pageState, editing: false, saving: false});
    }

    if (pageState.error) {
        return ( <div>ERROR: {pageState.error}</div> );
    } else if (pageState.loading) {
        return ( <div>Loading...</div> );
    } else if (pageState.saving) {
        return ( <div>Saving...</div>);
    } else if (pageState.editing) {
        return (
            <>
                <Link to='/widgets'>Back to list</Link>
                <ItemEdit item={itemState} saveItem={saveItem} />
            </>
        );
    } else {
        return (
            <>
                <Link to='/widgets'>Back to list</Link>
                <ItemDetail item={itemState} />
            </>
        );
    }
}

export default ItemPage;