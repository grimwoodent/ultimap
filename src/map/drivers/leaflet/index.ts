import { IGeoStrategy } from './../interface';
import { LeafletMapStrategy } from './map';
import { LeafletMarkerStrategy } from './marker';
import { LeafletMarkerPresetStrategy } from './preset/marker';
import { LeafletPolygonStrategy } from './polygon';
import { LeafletPolygonPresetStrategy } from './preset/polygon';
import { LeafletMapControlStrategy } from './map-control';
import { LeafletDOMEventStrategy } from './dom-event';
import { LeafletGeoEventStrategy } from './geo-event';
import { LeafletGeocoderStrategy } from './geocoder';

export class LeafletGeoStrategy implements IGeoStrategy {
    public map = new LeafletMapStrategy();

    public marker = new LeafletMarkerStrategy();

    public polygon = new LeafletPolygonStrategy();

    public mapControl = new LeafletMapControlStrategy();

    public domEvent = new LeafletDOMEventStrategy();

    public geoEvent = new LeafletGeoEventStrategy();

    public preset = {
        marker: new LeafletMarkerPresetStrategy(),
        polygon: new LeafletPolygonPresetStrategy(),
    };

    public geocoder = new LeafletGeocoderStrategy();

    public isAllowed(): boolean {
        return true;
    }
}
