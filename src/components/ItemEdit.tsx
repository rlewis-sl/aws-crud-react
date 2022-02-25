import { FormEvent } from "react";

function ItemEdit({ item, saveItem } : { item:any, saveItem:Function}) {
  function handleSubmit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();

    const form = event.target as typeof event.target & {
      name: {value: string};
      cost: {value: string};
      weight: {value: string};
    };

    const id = item.id;
    const name = form.name.value;
    const cost = form.cost.value;
    const weight = form.weight.value;

    const updatedWidget = { id, name, cost, weight };
    saveItem(updatedWidget);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>{" "}
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={item.name}
          placeholder="widget name"
        />
      </div>
      <div>
        <label htmlFor="cost">Cost:</label>{" "}
        <input
          type="text"
          id="cost"
          name="cost"
          defaultValue={item.cost}
          placeholder="widget cost"
        />
      </div>
      <div>
        <label htmlFor="weight">Weight:</label>{" "}
        <input
          type="text"
          id="weight"
          name="weight"
          defaultValue={item.weight}
          placeholder="widget weight"
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

export default ItemEdit;
