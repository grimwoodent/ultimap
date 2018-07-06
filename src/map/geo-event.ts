import { IGeoStrategy } from './drivers/interface/index';
import { IMapGeoEventName, IGeoEventStrategy, IMarkerGeoEventName } from './drivers/interface/geo-event';

export interface IGeoEvent {
    name: IMapGeoEventName;
    map: IMapGeoEventName;
    marker: IMarkerGeoEventName;
}

export class GeoEvent implements IGeoEvent {
    protected strategy: IGeoStrategy;

    constructor(strategy: IGeoStrategy) {
        this.strategy = strategy;
    }

    /**
     * @deprecated use map
     * @return {IMapGeoEventName}
     */
    public get name(): IMapGeoEventName {
        return this.map;
    }

    public get map(): IMapGeoEventName {
        return this.getStrategy().getMapEventName();
    }

    public get marker(): IMapGeoEventName {
        return this.getStrategy().getMarkerEventName();
    }

    /**
     * Стратегия работы с геообъектом
     * @return {any}
     */
    protected getStrategy(): IGeoEventStrategy {
        return this.strategy.geoEvent;
    }
}
