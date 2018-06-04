import { Geo } from './geo';
import {
    Constructor as CollectionConstructor,
    Strategy as CollectionStrategy,
} from './collection';
import { LeafletGeoStrategy } from './map/drivers/leaflet/index';
import { YandexGeoStrategy } from './map/drivers/yandex/index';

export const Collections = {
    Constructor: CollectionConstructor,
    Strategy: CollectionStrategy,
};

export const Strategy = {
    Leaflet: LeafletGeoStrategy,
    Yandex: YandexGeoStrategy,
};

export const GeoConstructor = Geo;

export const geo = new Geo();
