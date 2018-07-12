import { Map } from './map';
import { LeafletGeoStrategy } from './map/drivers/leaflet';
import { IGeoStrategy } from './map/drivers/interface';
import { Marker } from './map/marker';
import { MarkerPreset } from './map/preset/marker';
import { Polygon } from './map/polygon';
import { PolygonPreset } from './map/preset/polygon';
import { MapControlConstructor } from './map/map-control';
import { DOMEvent } from './map/dom-event';
import { Constructor as CollectionsConstructor } from './map/collection/constructor';
import { MarkerStrategy as MarkerCollectionsStrategy } from './map/collection/strategy/marker';
import { PolygonStrategy as PolygonCollectionsStrategy } from './map/collection/strategy/polygon';
import { GeoEvent } from './map/geo-event';
import { Geocoder } from './map/geocoder';

export class Geo {
    public Collections = {
        Type: {
            Marker: 'marker',
            Polygon: 'polygon',
        },
        Constructor: CollectionsConstructor,
        Strategy: {
            Marker: MarkerCollectionsStrategy,
            Polygon: PolygonCollectionsStrategy,
        },
    };

    protected strategy: IGeoStrategy;

    constructor(strategy?: IGeoStrategy) {
        this.strategy = strategy || null;
    }

    /**
     * Get the current work strategy.
     *
     * @return {IGeoStrategy}
     */
    public getStrategy(): IGeoStrategy {
        if (!this.strategy) {
            this.strategy = new LeafletGeoStrategy();
        }

        return this.strategy;
    }

    /**
     * Set the current work strategy.
     *
     * @param {IGeoStrategy} strategy
     *
     * @return {Geo}
     */
    public setStrategy(strategy: IGeoStrategy): Geo {
        this.strategy = strategy;

        return this;
    }

    /**
     * Create new geo-controller for the strategy.
     *
     * @param {IGeoStrategy} strategy
     *
     * @return {Geo}
     */
    public byStrategy(strategy: IGeoStrategy): Geo {
        return new (this.constructor as any)(strategy);
    }

    public isAllowed(): boolean {
        return this.getStrategy().isAllowed();
    }

    public get map() {
        return new Map(this.getStrategy());
    }

    public get marker() {
        return new Marker(this.getStrategy());
    }

    public get polygon() {
        return new Polygon(this.getStrategy());
    }

    public get mapControl() {
        return new MapControlConstructor(this.getStrategy());
    }

    public get preset() {
        return {
            marker: new MarkerPreset(this.getStrategy()),
            polygon: new PolygonPreset(this.getStrategy()),
        };
    }

    public get domEvent() {
        return new DOMEvent(this.getStrategy());
    }

    public get event() {
        return new GeoEvent(this.getStrategy());
    }

    public get geocoder() {
        return new Geocoder(this.getStrategy());
    }
}
