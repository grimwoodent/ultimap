import { IGeoStrategy } from './drivers/interface/index';
import { IGeoEventNames, IGeoEventStrategy } from './drivers/interface/geo-event';

export interface IGeoEvent {
    name: IGeoEventNames;
}

export class GeoEvent implements IGeoEvent {
    protected strategy: IGeoStrategy;

    constructor(strategy: IGeoStrategy) {
        this.strategy = strategy;
    }

    public get name(): IGeoEventNames {
        return this.getStrategy().getNames();
    }

    /**
     * Стратегия работы с геообъектом
     * @return {any}
     */
    protected getStrategy(): IGeoEventStrategy {
        return this.strategy.geoEvent;
    }
}
