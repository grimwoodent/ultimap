import { Coords } from './../../coords';
import { Icon } from '../../icon';
import { ICreateGeoObjectOptions, IEditableGeoObjectStrategy } from './index';

export interface ICreateMarkerOptions extends ICreateGeoObjectOptions {
    icon?: Icon;
    preset?: string;
}

/**
 * Интерфейс метки на карте
 */
export interface IMarkerStrategy extends IEditableGeoObjectStrategy<Coords, ICreateMarkerOptions> {
    setIcon(geoobject: any, icon: Icon): IMarkerStrategy;
    setPreset(geoobject: any, preset: string): IMarkerStrategy;
}
