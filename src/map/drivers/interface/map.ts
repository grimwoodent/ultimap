import { Coords } from './../../coords';
import { Bounds } from '../../bounds';
import { IEventedMapObjectStrategy } from './index';

export interface ICreateMapStrategyOptions {
    center?: Coords;
    bounds?: Bounds;
    zoom?: number;
}

/**
 * Интерфейс конфигурации карты
 */
export interface IMapStrategy extends IEventedMapObjectStrategy {
    load(element: HTMLElement, options?: ICreateMapStrategyOptions): Promise<any>;
    destroy(map: any): Promise<IMapStrategy>;
    setCenter(map: any, value: Coords): Promise<IMapStrategy>;
    getCenter(map: any): Coords;
    setZoom(map: any, value: number): Promise<IMapStrategy>;
    getZoom(map: any): number;
    setBounds(map: any, value: Bounds): Promise<IMapStrategy>;
    getBounds(map: any): Bounds;
    fitToViewport(map: any): Promise<IMapStrategy>;
    addControl(map: any, control: any): Promise<IMapStrategy>;
}
