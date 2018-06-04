import { IIcon } from '../../../icon';

export interface ICreateMarkerPresetProperties {
    icon: IIcon;
}

export interface IMarkerPresetStrategy {
    create(preset: string, props: ICreateMarkerPresetProperties): IMarkerPresetStrategy;
}
