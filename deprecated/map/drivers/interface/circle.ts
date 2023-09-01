import { Coords } from '../../coords';
import { ICreateGeoObjectOptions, IEditableGeoObjectStrategy } from './index';

// Вынести в отдельный файл при необходимости
export interface ICreateCircleStyle extends ICreateGeoObjectOptions {
    fillColor?: string;
    fillOpacity?: number;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWidth?: number;
}

export interface ICreateCircleOptions extends ICreateCircleStyle {
    radius?: number;
}

/**
 * Interface for circle on map
 */
export interface ICircleStrategy extends IEditableGeoObjectStrategy<Coords, ICreateCircleOptions> {
    setStyle(geoobject: any, style: ICreateCircleStyle): ICircleStrategy;
    setRadius(geoObject: any, radius: number): ICircleStrategy;
    getRadius(geoObject: any): number;
}
