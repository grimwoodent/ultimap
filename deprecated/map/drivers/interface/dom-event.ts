import { Coords } from '../../coords';

export interface IDOMEventStrategy {
    getCoords(domEvent: any): Coords;
    stop(domEvent: any): IDOMEventStrategy;
}
