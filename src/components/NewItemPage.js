import { useNavigate } from 'react-router-dom';
import NewItem from './NewItem'
import {createWidget} from '../api/widgets';

function NewItemPage() {
    const navigate = useNavigate();

    async function handleCreateItem(widget) {
        await createWidget(widget);
        navigate('/widgets', { replace: true });  // 'replace: true' prevents the current route from being included in the browser history
    }

    return (
        <NewItem createItem={handleCreateItem} />
    );
}

export default NewItemPage;
