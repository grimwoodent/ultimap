import { IGeoStrategy } from './drivers/interface/index';
import {
    IMapGeoEventName, IGeoEventStrategy, IMarkerGeoEventName,
    IPolygonGeoEventName,
} from './drivers/interface/geo-event';

export interface IGeoEvent {
    map: IMapGeoEventName;
    marker: IMarkerGeoEventName;
    polygon: IPolygonGeoEventName;
}

export class GeoEvent implements IGeoEvent {
    protected strategy: IGeoStrategy;

    constructor(strategy: IGeoStrategy) {
        this.strategy = strategy;
    }

    public get map(): IMapGeoEventName {
        return this.getStrategy().getMapEventName();
    }

    public get marker(): IMapGeoEventName {
        return this.getStrategy().getMarkerEventName();
    }

    public get polygon(): IPolygonGeoEventName {
        return this.getStrategy().getPolygonEventName();
    }

    /**
     * Стратегия работы с геообъектом
     * @return {any}
     */
    protected getStrategy(): IGeoEventStrategy {
        return this.strategy.geoEvent;
    }
}
