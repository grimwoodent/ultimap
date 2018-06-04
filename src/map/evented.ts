import {
    IEventedMapObjectStrategy,
    IGeoStrategy,
} from './drivers/interface';
import { EventHandlerFn, IEventHandlerFnMap, Events, IEvents } from './events';

export interface IEvented<TPropertiesForUpdate> {
    updateProperties(props?: TPropertiesForUpdate): Promise<IEvented<TPropertiesForUpdate>>;
    hasInstance(): boolean;
    getInstance(createNewInstance: boolean): any;

    on(type: string | IEventHandlerFnMap, fn?: EventHandlerFn): IEvented<TPropertiesForUpdate>;
    off(type: string, fn?: EventHandlerFn): IEvented<TPropertiesForUpdate>;
}

export abstract class Evented<TPropertiesForUpdate, TPropertiesForCreate> implements IEvented<TPropertiesForUpdate> {
    protected instance: any;
    protected strategy: IGeoStrategy;
    protected props: TPropertiesForCreate;
    protected events: IEvents;

    constructor(strategy: IGeoStrategy) {
        if (!strategy) {
            throw new Error('Geo strategy not found');
        }

        this.props = {} as TPropertiesForCreate;
        // Передаем провайдер событий в стратегию
        this.events = new Events({
            on: (type: string | IEventHandlerFnMap, fn?: EventHandlerFn) => {
                if (this.hasInstance()) {
                    this.getStrategy().on(this.getInstance(), type, fn);
                }
            },
            off: (type: string, fn?: EventHandlerFn) => {
                if (this.hasInstance()) {
                    this.getStrategy().off(this.getInstance(), type, fn);
                }
            },
        });
        this.strategy = strategy;
    }

    /**
     * Обновить параметры объекта
     *
     * @param {TPropertiesForUpdate} options
     *
     * @return {Promise<IGeoObject>}
     */
    public abstract updateProperties(options?: TPropertiesForUpdate): Promise<IEvented<TPropertiesForUpdate>>;

    /**
     * Есть ли созданный экземпляр объекта для стратегии
     *
     * @return {boolean}
     */
    public hasInstance(): boolean {
        return !!this.instance;
    }

    /**
     * Получить элемент для работы со стратегиями
     *
     * @return {any}
     */
    public abstract getInstance(createNewInstance?: boolean): any;

    /**
     * Включить событие
     *
     * @param {string | IEventHandlerFnMap} type
     * @param {EventHandlerFn} fn
     *
     * @return {IEvented<TPropertiesForUpdate>}
     */
    public on(type: string | IEventHandlerFnMap, fn?: EventHandlerFn): IEvented<TPropertiesForUpdate> {
        const events = typeof type === 'object'
            ? type
            : { [type]: fn };

        // Работа со стратегией перенесена в группы через strategyProvider
        Object.keys(events).forEach((key) => {
            this.events.add(key, events[key]);
        });

        return this;
    }

    /**
     * Отключить событие
     *
     * @param {string} type
     * @param {EventHandlerFn} fn
     *
     * @return {IEvented<TPropertiesForUpdate>}
     */
    public off(type: string, fn?: EventHandlerFn): IEvented<TPropertiesForUpdate> {
        if (this.events.isEmpty(type)) {
            return this;
        }

        // Работа со стратегией перенесена в группы через strategyProvider
        this.events.remove(type, fn);

        return this;
    }

    /**
     * Стратегия работы с геообъектом
     * @return {any}
     */
    protected abstract getStrategy(): IEventedMapObjectStrategy;
}
