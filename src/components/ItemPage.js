
import {useParams} from 'react-router-dom';

function ItemPage() {
    const {widgetId} = useParams();

    return (
        <div>Widget ID = {widgetId}</div>
    );
}

export default ItemPage;