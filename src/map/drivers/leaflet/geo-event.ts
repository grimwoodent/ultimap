import { IMapGeoEventName, IGeoEventStrategy, IMarkerGeoEventName } from '../interface/geo-event';

export class LeafletGeoEventStrategy implements IGeoEventStrategy {
    public getMapEventName(): IMapGeoEventName {
        return {
            click: 'click',
            mousedown: 'mousedown',
            mouseup: 'mouseup',
            mouseenter: 'mouseover',
            mouseleave: 'mouseout',
            drag: 'drag',
            dragstart: 'dragstart',
            dragend: 'dragend',
            contextmenu: 'contextmenu',
            move: 'move',
        };
    }

    public getMarkerEventName(): IMarkerGeoEventName {
        return {
            add: 'add',
            remove: 'remove',

            drag: 'drag',
            dragstart: 'dragstart',
            dragend: 'dragend',
            move: 'move',

            click: 'click',
            mousedown: 'mousedown',
            mouseup: 'mouseup',
            mouseenter: 'mouseover',
            mouseleave: 'mouseout',
        };
    }
}
