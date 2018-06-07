import { Api } from './utils/ymaps';
import { IGeoStrategy } from '../interface/index';
import { YandexMapStrategy } from './map';
import { YandexGeocoderStrategy } from './geocoder';
import { YandexMarkerStrategy } from './marker';
import { YandexPolygonStrategy } from './polygon';

export class YandexGeoStrategy implements IGeoStrategy {
    public map = new YandexMapStrategy();

    public marker = new YandexMarkerStrategy();

    public polygon = new YandexPolygonStrategy();

    public mapControl = null as any;

    public domEvent = null as any;

    public geoEvent = null as any;

    public preset = {
        marker: null as any,
        polygon: null as any,
    };

    public geocoder = new YandexGeocoderStrategy();

    public isAllowed(): boolean {
        return !!Api.ymaps;
    }
}
