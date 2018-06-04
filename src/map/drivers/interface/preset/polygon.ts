import { ICreatePolygonStyle } from '../polygon';

export interface IPolygonPresetProperties {
    style: any;
}

export interface ICreatePolygonPresetProperties {
    style: ICreatePolygonStyle,
}

export interface IPolygonPresetStrategy {
    create(preset: string, props: ICreatePolygonPresetProperties): IPolygonPresetStrategy;
    get(preset: string): IPolygonPresetProperties;
}
