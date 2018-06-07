import { Geo } from './geo';
import { Coords } from './map/coords';
import { Bounds } from './map/bounds';
import { LeafletGeoStrategy } from './map/drivers/leaflet/index';
import { YandexGeoStrategy } from './map/drivers/yandex/index';

export {
    Coords,
    Bounds,
};

export const Strategy = {
    Leaflet: LeafletGeoStrategy,
    Yandex: YandexGeoStrategy,
};

export const GeoConstructor = Geo;

export const geo = new Geo();
