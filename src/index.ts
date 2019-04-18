import { Geo } from './geo';
import { Coords, ILatLng, IPoint } from './map/coords';
import { PolygonCoords } from './map/polygon-coords';
import { Bounds } from './map/bounds';
import { IMarker, Marker } from './map/marker';
import { IPolygon, Polygon } from './map/polygon';
import { IMap, Map } from './map/index';
import { IIcon, Icon } from './map/icon';
import { IGeocoder, Geocoder } from './map/geocoder';
import { IGeoEvent, GeoEvent } from './map/geo-event';
import { IDOMEvent, DOMEvent } from './map/dom-event';

import { LeafletGeoStrategy } from './map/drivers/leaflet/index';
import { YandexGeoStrategy } from './map/drivers/yandex/index';
import { GoogleGeoStrategy } from './map/drivers/google/index';

export {
    Geo,

    ILatLng,
    IPoint,
    Coords,

    PolygonCoords,
    Bounds,

    IMarker,
    Marker,

    IPolygon,
    Polygon,

    IMap,
    Map,

    IIcon,
    Icon,

    IGeocoder,
    Geocoder,

    IGeoEvent,
    GeoEvent,

    IDOMEvent,
    DOMEvent,
};

export const Strategy = {
    Leaflet: LeafletGeoStrategy,
    Yandex: YandexGeoStrategy,
    Google: GoogleGeoStrategy,
};

export const geo = new Geo();
