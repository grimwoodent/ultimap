export type EventHandlerFn = (event: any) => void;

export interface EventHandlerFnMap {
  [type: string]: EventHandlerFn;
}

export interface EventInList {
  fn: EventHandlerFn;
  context?: any;
}

export interface EventsGroup {
  resetAll(): EventsGroup;
  removeAll(): EventsGroup;
  add(key: string, event: EventHandlerFn | EventInList): EventsGroup;
  remove(key: string, fn?: EventHandlerFn): EventsGroup;
  get(key: string): EventInList[];
  isEmpty(key: string): boolean;
}

export interface EventsList {
  resetAll(): EventsList;
  removeAll(): EventsList;
  group(): EventsGroup;
  add(key: string, event: EventHandlerFn | EventInList): EventsList;
  remove(key: string, fn?: EventHandlerFn): EventsList;
  get(key: string): EventInList[];
  isEmpty(key: string): boolean;
}
