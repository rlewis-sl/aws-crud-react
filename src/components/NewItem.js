export default function NewItem({ createItem }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.target;

    const name = form["name"].value;
    const cost = form["cost"].value;
    const weight = form["weight"].value;

    const widget = { name, cost, weight };
    createItem(widget);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>{" "}
        <input type="text" id="name" name="name" placeholder="widget name" />
      </div>
      <div>
        <label htmlFor="cost">Cost:</label>{" "}
        <input type="text" id="cost" name="cost" placeholder="widget cost" />
      </div>
      <div>
        <label htmlFor="weight">Weight:</label>{" "}
        <input
          type="text"
          id="weight"
          name="weight"
          placeholder="widget weight"
        />
      </div>
      <button type="submit">Create Widget</button>
    </form>
  );
}
