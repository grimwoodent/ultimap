import { IGeoEventNames, IGeoEventStrategy } from '../interface/geo-event';

export class YandexGeoEventStrategy implements IGeoEventStrategy {
    public getNames(): IGeoEventNames {
        return {
            click: 'click',
            mousedown: 'mousedown',
            mouseup: 'mouseup',
            mouseenter: 'mouseenter',
            mouseleave: 'mouseleave',
            drag: 'boundschange', // other action?
            dragstart: 'actionbegin', // other action?
            dragend: 'actionend', // other action?
            contextmenu: 'contextmenu',
            move: 'boundschange',
        };
    }
}
