import { IGeoStrategy } from '../interface/index';
import { YandexGeocoderStrategy } from './geocoder';
import { ymaps } from './utils/ymaps';

export class YandexGeoStrategy implements IGeoStrategy {
    public map = null as any;

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
