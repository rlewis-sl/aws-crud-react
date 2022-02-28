export type WidgetId = string;
export type WidgetContent = { name: string, cost: number, weight: number};
export type Widget = WidgetContent & { id: WidgetId };
