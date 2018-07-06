export interface IMapGeoEventName {
    click?: string;
    mousedown?: string;
    mouseup?: string;
    mouseenter?: string;
    mouseleave?: string;
    drag?: string;
    dragstart?: string;
    dragend?: string;
    contextmenu?: string;
    boundschange?: string;
    move?: string;
}

export interface IMarkerGeoEventName {
    add?: string;
    remove?: string;
    click?: string;
    drag?: string;
    dragstart?: string;
    dragend?: string;
    move?: string;

    mousedown?: string;
    mouseup?: string;
    mouseenter?: string;
    mouseleave?: string;
}

export interface IGeoEventStrategy {
    getMapEventName(): IMapGeoEventName;
    getMarkerEventName(): IMarkerGeoEventName;
}
