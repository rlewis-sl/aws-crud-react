export type WidgetId = string;
export type WidgetContent = { name: string; cost: number; weight: number };
export type Widget = { id: WidgetId } & WidgetContent;

export type WidgetCollection = { items: Widget[] };
