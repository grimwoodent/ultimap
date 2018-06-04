import { EventHandlerFn, IEventInList } from './index';
import * as Utils from './../utils';
import { IEventsStrategyProvider } from './strategy-provider';

export interface IEventsGroup {
    resetAll(): IEventsGroup;
    removeAll(): IEventsGroup;
    add(key: string, event: EventHandlerFn|IEventInList): IEventsGroup;
    remove(key: string, fn?: EventHandlerFn): IEventsGroup;
    get(key: string): IEventInList[];
    isEmpty(key: string): boolean;
}

export class EventsGroup implements IEventsGroup {
    protected strategyProvider: IEventsStrategyProvider;
    protected list: { [type: string]: IEventInList[] };

    constructor(strategyProvider: IEventsStrategyProvider) {
        this.strategyProvider = strategyProvider;
        this.list = {};
    }

    /**
     * Обновить все события на элементе
     *
     * @return {IEventsGroup}
     */
    public resetAll(): IEventsGroup {
        Object.keys(this.list).forEach((key) => {
            const events = this.list[key];

            events.forEach((event) => {
                this.strategyProvider.off(key, event.fn);
                this.strategyProvider.on(key, event.fn);
            });
        });

        return this;
    }

    /**
     * Добавить событие
     *
     * @param {string} key
     * @param {IEventInList|EventHandlerFn} fn
     *
     * @return {IEvents}
     */
    public add(key: string, fn: EventHandlerFn|IEventInList): IEventsGroup {
        if (!key) {
            throw new Error('Key not found');
        }

        const event = typeof fn === 'object'
            ? fn
            : { fn };

        if (typeof event.fn !== 'function') {
            throw new Error('Event type is`not function');
        }

        this.list[key] = this.get(key).concat([event]);
        this.strategyProvider.on(key, event.fn);

        return this;
    }

    /**
     * Удалить события/событие по ключу
     *
     * @param {string} key
     * @param {EventHandlerFn} fn
     *
     * @return {IEvents}
     */
    public remove(key: string, fn?: EventHandlerFn): IEventsGroup {
        if (!fn) {
            this.get(key).forEach((event) => {
                event.fn = Utils.falseFn;
            });

            delete this.list[key];
        } else {
            const events = this.get(key);
            const idx = events.findIndex((event) => event.fn === fn);

            if (~idx) {
                const event = events[idx];

                event.fn = Utils.falseFn;
                this.list[key].splice(idx, 1);
            }
        }

        this.strategyProvider.off(key, fn);

        return this;
    }

    /**
     * Получить все соыбтия по этому ключу
     *
     * @param {string} key
     *
     * @return {Array<IEventInList>}
     */
    public get(key: string): IEventInList[] {
        if (!key) {
            throw new Error('Key not found');
        }

        return this.list[key] || [];
    }

    /**
     * Есть ли события по этому ключу
     *
     * @param {string} key
     *
     * @return {boolean}
     */
    public isEmpty(key: string): boolean {
        if (!key) {
            throw new Error('Key not found');
        }

        return !this.get(key).length;
    }

    /**
     * Удалить все события
     * @return {IEventsGroup}
     */
    public removeAll(): IEventsGroup {
        Object.keys(this.list).forEach((key) => {
            this.remove(key);
        });

        return this;
    }
}
