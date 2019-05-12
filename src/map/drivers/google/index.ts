import { Api } from './utils/google';
import { IGeoStrategy } from '../interface/index';
import { GoogleMapStrategy } from './map';
// import { GoogleGeocoderStrategy } from './geocoder';
// import { GoogleMarkerStrategy } from './marker';
// import { GooglePolygonStrategy } from './polygon';
// import { GoogleGeoEventStrategy } from './geo-event';
// import { GoogleDOMEventStrategy } from './dom-event';
// import { GoogleMapControlStrategy } from './map-control';

export class GoogleGeoStrategy implements IGeoStrategy {
    public map = new GoogleMapStrategy();

    // public marker = new GoogleMarkerStrategy();
    public marker = null as any;

    // public polygon = new GooglePolygonStrategy();
    public polygon = null as any;

    public circle = null as any;

    // public mapControl = new GoogleMapControlStrategy();
    public mapControl = null as any;

    // public domEvent = new GoogleDOMEventStrategy();
    public domEvent = null as any;

    // public geoEvent = new GoogleGeoEventStrategy();
    public geoEvent = null as any;

    public preset = {
        marker: null as any,
        polygon: null as any,
    };

    // public geocoder = new GoogleGeocoderStrategy();
    public geocoder = null as any;

    public isAllowed(): boolean {
        return !!Api.google;
    }
}
