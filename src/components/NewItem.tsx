import { FormEvent } from "react";
import { WidgetContent, WidgetFormContent } from "../model/widget";

function NewItem({ createItem } : { createItem:(widget: WidgetContent) => void} ) {
  const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.target as (typeof event.target) & WidgetFormContent;

    const name = form.name.value;
    const cost = +form.cost.value;
    const weight = +form.weight.value;

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

export default NewItem;
