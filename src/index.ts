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

export const geo = new Geo();
