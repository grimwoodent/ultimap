import { EventHandlerFn, IEventHandlerFnMap } from './index';

type tOn = (type: string | IEventHandlerFnMap, fn?: EventHandlerFn) => void;
type tOff = (type: string, fn?: EventHandlerFn) => void;

export interface IEventsStrategyProvider {
    on(type: string | IEventHandlerFnMap, fn?: EventHandlerFn): void;
    off(type: string, fn?: EventHandlerFn): void;
}

export class EventsStrategyProvider {
    public on: tOn;
    public off: tOff;

    constructor(methods: {
        on: tOn,
        off: tOff,
    }) {
        this.on = methods.on;
        this.off = methods.off;
    }
}
