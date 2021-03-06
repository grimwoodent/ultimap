import { Api } from './utils/ymaps';
import { IGeoStrategy } from '../interface/index';
import { YandexMapStrategy } from './map';
import { YandexGeocoderStrategy } from './geocoder';
import { YandexMarkerStrategy } from './marker';
import { YandexPolygonStrategy } from './polygon';
import { YandexGeoEventStrategy } from './geo-event';
import { YandexDOMEventStrategy } from './dom-event';
import { YandexMapControlStrategy } from './map-control';

export class YandexGeoStrategy implements IGeoStrategy {
    public map = new YandexMapStrategy();

    public marker = new YandexMarkerStrategy();

    public circle = null as any;

    public polygon = new YandexPolygonStrategy();

    public mapControl = new YandexMapControlStrategy();

    public domEvent = new YandexDOMEventStrategy();

    public geoEvent = new YandexGeoEventStrategy();

    public preset = {
        marker: null as any,
        polygon: null as any,
    };

    public geocoder = new YandexGeocoderStrategy();

    public isAllowed(): boolean {
        return !!Api.ymaps;
    }
}
