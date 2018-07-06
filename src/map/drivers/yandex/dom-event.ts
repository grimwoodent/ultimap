import * as L from 'leaflet';
import { IDOMEventStrategy } from '../interface/dom-event';
import { Coords, tCoords } from '../../coords';
import { YMapEvent } from './utils/ymaps';

export class YandexDOMEventStrategy implements IDOMEventStrategy {
    /**
     * Получить координаты от события
     *
     * @param domEvent
     *
     * @return {Coords}
     */
    public getCoords(domEvent: YMapEvent): Coords {
        return new Coords(domEvent.get('coords') as tCoords);
    }

    /**
     * Остановить распространение события
     *
     * @param domEvent
     *
     * @return {IDOMEventStrategy}
     */
    public stop(domEvent: YMapEvent): IDOMEventStrategy {
        (domEvent as any).stopPropagation();

        return this;
    }
}
