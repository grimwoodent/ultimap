import { Geo } from './geo';
import { LeafletGeoStrategy } from './map/drivers/leaflet/index';
import { YandexGeoStrategy } from './map/drivers/yandex/index';

export const Strategy = {
    Leaflet: LeafletGeoStrategy,
    Yandex: YandexGeoStrategy,
};

export const GeoConstructor = Geo;

export const geo = new Geo();
