import { IMapGeoEventName, IGeoEventStrategy, IMarkerGeoEventName } from '../interface/geo-event';

export class YandexGeoEventStrategy implements IGeoEventStrategy {
    public getMapEventName(): IMapGeoEventName {
        return {
            click: 'click',
            mousedown: 'mousedown',
            mouseup: 'mouseup',
            mouseenter: 'mouseenter',
            mouseleave: 'mouseleave',
            drag: 'boundschange', // ?
            dragstart: 'actionbegin', //?
            dragend: 'actionend', // ?
            contextmenu: 'contextmenu',
            move: 'boundschange',
        };
    }

    public getMarkerEventName(): IMarkerGeoEventName {
        return {
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
}
