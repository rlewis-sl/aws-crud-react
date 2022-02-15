import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ItemDetail from './ItemDetail';
import ItemEdit from './ItemEdit';
import { getWidgetAsync, updateWidgetAsync, deleteWidgetAsync } from '../api/widgets';

function ItemPage() {
    const {widgetId} = useParams();
    const navigate = useNavigate();
    const [itemState, setItemState] = useState({});
    const [pageState, setPageState] = useState({error: '', loading: true, editing: false, saving: false, deleting: false});

    function handleError(error) {
        console.log(error);
        setPageState({error: error.message, loading: false, editing: false, saving: false, deleting: false});
    }
  
    useEffect( () => {
        getWidgetAsync(widgetId)
            .then(item => {
                setItemState(item);
                setPageState(state => ({...state, loading: false, editing: true, saving: false, deleting: false}));
            })
            .catch(error => handleError(error));
    }, [widgetId]);

    async function saveItem(widget) {
        setPageState({...pageState, editing: false, saving: true, deleting: false});
        const updatedItem = await updateWidgetAsync(widget);
        setItemState(updatedItem);
        setPageState({...pageState, editing: false, saving: false, deleting: false});
    }

    async function deleteItem(id) {
        setPageState({...pageState, editing: false, saving: false, deleting: true});
        setItemState({});
        await deleteWidgetAsync(id);
        navigate('/widgets', { replace: true });  // 'replace: true' prevents the current route from being included in the browser history
    }

    const handleDeleteClick = (event) => {
        event.preventDefault();
        event.stopPropagation();

        deleteItem(itemState.id);
    };

    if (pageState.error) {
        return ( <div>ERROR: {pageState.error}</div> );
    } else if (pageState.loading) {
        return ( <div>Loading...</div> );
    } else if (pageState.saving) {
        return ( <div>Saving...</div> );
    } else if (pageState.deleting) {
        return ( <div>Deleting...</div> );
    } else if (pageState.editing) {
        return (
            <>
                <Link to='/widgets'>Back to list</Link>
                <ItemEdit item={itemState} saveItem={saveItem} />
                <button onClick={handleDeleteClick}>Delete</button>
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