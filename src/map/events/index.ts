import { EventsGroup, IEventsGroup } from './group';
import { IEventsStrategyProvider } from './strategy-provider';

export type EventHandlerFn = (event: any) => void;

export interface IEventHandlerFnMap {
    [type: string]: EventHandlerFn;
}

export interface IEventInList {
    fn: EventHandlerFn;
    context?: any;
}

export interface IEvents {
    resetAll(): IEvents;
    removeAll(): IEvents;
    group(): EventsGroup;
    add(key: string, event: EventHandlerFn|IEventInList): IEvents;
    remove(key: string, fn?: EventHandlerFn): IEvents;
    get(key: string): IEventInList[];
    isEmpty(key: string): boolean;
}

export class Events implements IEvents {
    /** @var {IEventsGroup} general Основная группа событий для объекта */
    protected general: IEventsGroup;
    /** @var {IEventsStrategyProvider} strategyProvider Провайдер методов для работы со стратегией объекта */
    protected strategyProvider: IEventsStrategyProvider;

    constructor(strategyProvider: IEventsStrategyProvider) {
        this.strategyProvider = strategyProvider;
        this.general = new EventsGroup(this.strategyProvider);
    }

    public resetAll(): IEvents {
        this.general.resetAll();

        return this;
    }

    public removeAll(): IEvents {
        this.general.removeAll();

        return this;
    }

    public group(): EventsGroup {
        return new EventsGroup(this.strategyProvider);
    }

    /**
     * Добавить событие
     *
     * @param {string} key
     * @param {IEventInList | EventHandlerFn} event
     *
     * @return {IEvents}
     */
    public add(key: string, event: EventHandlerFn|IEventInList): IEvents {
        this.general.add(key, event);

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
    public remove(key: string, fn?: EventHandlerFn): IEvents {
        this.general.remove(key, fn);

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
        return this.general.get(key);
    }

    /**
     * Есть ли события по этому ключу
     *
     * @param {string} key
     *
     * @return {boolean}
     */
    public isEmpty(key: string): boolean {
        return this.general.isEmpty(key);
    }
}
