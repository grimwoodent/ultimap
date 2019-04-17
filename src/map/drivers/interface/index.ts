import { IMarkerStrategy } from './marker';
import { IMapStrategy } from './map';
import { IMarkerPresetStrategy } from './preset/marker';
import { IPolygonStrategy } from './polygon';
import { IPolygonPresetStrategy } from './preset/polygon';
import { Bounds } from '../../bounds';
import { IMapControlStrategy } from './map-control';
import { EventHandlerFn, IEventHandlerFnMap } from '../../events/index';
import { IDOMEventStrategy } from './dom-event';
import { IGeoEventStrategy } from './geo-event';
import { IGeocoderStrategy } from './geocoder';

export type tExtraData = { [key: string]: any };

export interface IUpdateGeoObjectOptions {
    editable?: boolean;
    data?: tExtraData;
}

export interface ICreateGeoObjectOptions {
    editable?: boolean;
}

export interface IEventedMapObjectStrategy {
    on(geoObject: any, type: string | IEventHandlerFnMap, fn?: EventHandlerFn, context?: any): IEventedMapObjectStrategy;
    off(geoObject: any, type: string, fn?: EventHandlerFn, context?: any): IEventedMapObjectStrategy;
}

export interface IMapObjectStrategy extends IEventedMapObjectStrategy {
    addToMap(geoObject: any, map: any): IMapObjectStrategy;
    removeFromMap(geoObject: any, map: any): IMapObjectStrategy;
}

export interface IGeoObjectStrategy<TCoords, TProps> extends IMapObjectStrategy {
    create(coords: TCoords, props: TProps): any;

    getCoords(geoObject: any): TCoords;
    setCoords(geoObject: any, value: TCoords): IGeoObjectStrategy<TCoords, TProps>;
    getBounds(geoobject: any): Bounds;
}

export interface IEditableGeoObjectStrategy<TCoords, TProps> extends IGeoObjectStrategy<TCoords, TProps> {
    setEditable(geoobject: any, value: boolean): IEditableGeoObjectStrategy<TCoords, TProps>;
}

export interface IGeoStrategy {
    map: IMapStrategy;
    marker: IMarkerStrategy;
    polygon: IPolygonStrategy;
    mapControl: IMapControlStrategy;
    domEvent: IDOMEventStrategy;
    geoEvent: IGeoEventStrategy;
    preset: {
        marker: IMarkerPresetStrategy,
        polygon: IPolygonPresetStrategy,
    };
    geocoder: IGeocoderStrategy;
    isAllowed(): boolean;
}
