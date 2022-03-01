export type WidgetId = string;
export interface WidgetContent {
    name: string;
    cost: number;
    weight: number;
}
export type Widget = { id: WidgetId } & WidgetContent;

export interface WidgetCollection { items: Widget[] }

export interface WidgetFormContent {
    name: { value: string };
    cost: { value: string };
    weight: {value: string };
  }
    