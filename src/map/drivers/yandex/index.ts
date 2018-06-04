import { ymaps } from './utils/ymaps';
import { IGeoStrategy } from '../interface/index';
import { YandexMapStrategy } from './map';
import { YandexGeocoderStrategy } from './geocoder';

export class YandexGeoStrategy implements IGeoStrategy {
    public map = new YandexMapStrategy();

    public marker = null as any;

    public polygon = null as any;

    public mapControl = null as any;

    public domEvent = null as any;

    public geoEvent = null as any;

    public preset = {
        marker: null as any,
        polygon: null as any,
    };

    public geocoder = new YandexGeocoderStrategy();

    public isAllowed(): boolean {
        return !!ymaps;
    }
}
