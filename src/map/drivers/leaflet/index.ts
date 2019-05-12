import { IGeoStrategy } from './../interface';
import { IMapStrategy } from '../interface/map';

import { ILeafletMapStrategyProps, LeafletMapStrategy } from './map';
import { LeafletMarkerStrategy } from './marker';
import { LeafletMarkerPresetStrategy } from './preset/marker';
import { LeafletPolygonStrategy } from './polygon';
import { LeafletPolygonPresetStrategy } from './preset/polygon';
import { LeafletMapControlStrategy } from './map-control';
import { LeafletDOMEventStrategy } from './dom-event';
import { LeafletGeoEventStrategy } from './geo-event';
import { LeafletGeocoderStrategy } from './geocoder';
import { LeafletCircleStrategy } from './circle';

export interface ILeafletGeoStrategyProps extends ILeafletMapStrategyProps {

}

export class LeafletGeoStrategy implements IGeoStrategy {
    public map: IMapStrategy;

    public marker = new LeafletMarkerStrategy();

    public polygon = new LeafletPolygonStrategy();

    public circle = new LeafletCircleStrategy();

    public mapControl = new LeafletMapControlStrategy();

    public domEvent = new LeafletDOMEventStrategy();

    public geoEvent = new LeafletGeoEventStrategy();

    public preset = {
        marker: new LeafletMarkerPresetStrategy(),
        polygon: new LeafletPolygonPresetStrategy(),
    };

    public geocoder = new LeafletGeocoderStrategy();

    constructor(props?: ILeafletGeoStrategyProps) {
        this.initMap(props);
    }

    public isAllowed(): boolean {
        return true;
    }

    protected initMap(props?: ILeafletGeoStrategyProps) {
        if (this.map) {
            throw new Error('Map already exist');
        }

        this.map = new LeafletMapStrategy(props);
    }
}
