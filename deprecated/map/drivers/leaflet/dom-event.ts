import * as L from 'leaflet';
import { IDOMEventStrategy } from '../interface/dom-event';
import { Coords, tCoords } from '../../coords';
import { LeafletMouseEvent } from 'leaflet';

export class LeafletDOMEventStrategy implements IDOMEventStrategy {
    /**
     * Получить координаты от события
     *
     * @param domEvent
     *
     * @return {Coords}
     */
    public getCoords(domEvent: LeafletMouseEvent): Coords {
        return new Coords(domEvent.latlng as tCoords);
    }

    /**
     * Остановить распространение события
     *
     * @param domEvent
     *
     * @return {IDOMEventStrategy}
     */
    public stop(domEvent: LeafletMouseEvent): IDOMEventStrategy {
        L.DomEvent.stopPropagation(domEvent as any);

        return this;
    }
}
