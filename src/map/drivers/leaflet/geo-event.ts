import { IGeoEventNames, IGeoEventStrategy } from '../interface/geo-event';

export class LeafletGeoEventStrategy implements IGeoEventStrategy {
    public getNames(): IGeoEventNames {
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
        };
    }
}
