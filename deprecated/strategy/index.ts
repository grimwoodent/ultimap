import { LeafletGeoStrategy } from '../map/drivers/leaflet/index';
import { YandexGeoStrategy } from '../map/drivers/yandex/index';
import { GoogleGeoStrategy } from '../map/drivers/google/index';

export const Strategy = {
    Leaflet: LeafletGeoStrategy,
    Yandex: YandexGeoStrategy,
    Google: GoogleGeoStrategy,
};
