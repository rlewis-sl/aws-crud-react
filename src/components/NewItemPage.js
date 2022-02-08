import NewItem from './NewItem'
import {createWidget} from '../api/widgets';

function NewItemPage() {
    return (
        <NewItem createItem={createWidget} />
    );
}

export default NewItemPage;
