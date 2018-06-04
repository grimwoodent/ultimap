import { ICreateGeoObjectOptions, IEditableGeoObjectStrategy } from './index';
import { PolygonCoords } from '../../polygon-coords';

// Вынести в отдельный файл при необходимости
export interface ICreatePolygonStyle extends ICreateGeoObjectOptions {
    fillColor?: string;
    fillOpacity?: number;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWidth?: number;
}

export interface ICreatePolygonOptions extends ICreatePolygonStyle {
    preset?: string;
}

export interface IPolygonStrategy extends IEditableGeoObjectStrategy<PolygonCoords, ICreatePolygonOptions> {
    setStyle(geoobject: any, style: ICreatePolygonStyle): IPolygonStrategy;
    setPreset(geoobject: any, preset: string): IPolygonStrategy;
    setDrawing(geoobject: any, value: boolean): IPolygonStrategy;
}
