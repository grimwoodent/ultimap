import { IMapGeoEventName, IGeoEventStrategy, IMarkerGeoEventName, IPolygonGeoEventName } from '../interface/geo-event';

export class YandexGeoEventStrategy implements IGeoEventStrategy {
    public getMapEventName(): IMapGeoEventName {
        return {
            click: 'click',
            mousedown: 'mousedown',
            mouseup: 'mouseup',
            mouseenter: 'mouseenter',
            mouseleave: 'mouseleave',
            drag: 'boundschange', // ?
            dragstart: 'actionbegin', // ?
            dragend: 'actionend', // ?
            contextmenu: 'contextmenu',
            move: 'boundschange',
        };
    }

    public getMarkerEventName(): IMarkerGeoEventName {
        return {
            // add: 'add', // ?
            // remove: 'remove', // ?

            drag: 'drag',
            dragstart: 'dragstart',
            dragend: 'dragend',
            move: 'geometrychange',

            click: 'click',
            mousedown: 'mousedown',
            mouseup: 'mouseup',
            mouseenter: 'mouseenter',
            mouseleave: 'mouseleave',
        };
    }

    public getPolygonEventName(): IPolygonGeoEventName {
        return {
            // add: 'add', // ?
            // remove: 'remove', // ?

            click: 'click',
            mousedown: 'mousedown',
            mouseup: 'mouseup',
            mouseenter: 'mouseenter',
            mouseleave: 'mouseleave',
        };
    }
}
