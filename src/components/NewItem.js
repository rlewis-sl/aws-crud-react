
export default function NewItem(props) {

    const createItem = props.createItem;
    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const name = e.target["name"].value;
        const cost = e.target["cost"].value;
        const weight = e.target["weight"].value;

        const widget = {name, cost, weight};
        createItem(widget);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div><label htmlFor="name">Name:</label> <input type="text" id="name" name="name" placeholder="widget name" /></div>
            <div><label htmlFor="cost">Cost:</label> <input type="text" id="cost" name="cost" placeholder="widget cost" /></div>
            <div><label htmlFor="weight">Weight:</label> <input type="text" id="weight" name="weight" placeholder="widget weight" /></div>
            <button type="submit">Create Widget</button>
        </form>
    );
}
