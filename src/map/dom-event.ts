import { IGeoStrategy } from './drivers/interface/index';
import { Coords } from './coords';
import { IDOMEventStrategy } from './drivers/interface/dom-event';

interface IDOMEvent {
    create(instance: any): IDOMEvent;
    stop(): IDOMEvent;
    getCoords(domEvent: any): Coords;
    getInstance(): any;
}

export class DOMEvent implements IDOMEvent {
    protected instance: any;
    protected strategy: IGeoStrategy;

    constructor(strategy: IGeoStrategy) {
        this.strategy = strategy;
    }

    /**
     * Создать экземпляр объекта события
     *
     * @param instance
     *
     * @return {IDOMEvent}
     */
    public create(instance: any): IDOMEvent {
        this.instance = instance;

        return this;
    }

    /**
     * Получить координаты объекта
     *
     * @param domEvent
     *
     * @return {Coords}
     */
    public getCoords(): Coords {
        return this.getStrategy().getCoords(this.getInstance());
    }

    /**
     * Остановить распространение события
     *
     * @return {IDOMEvent}
     */
    public stop(): IDOMEvent {
        this.getStrategy().stop(this.getInstance());

        return this;
    }

    /**
     * Получить элемент события
     *
     * @return {any}
     */
    public getInstance(): any {
        return this.instance;
    }

    /**
     * Стратегия работы с геообъектом
     * @return {any}
     */
    protected getStrategy(): IDOMEventStrategy {
        return this.strategy.domEvent;
    }
}
