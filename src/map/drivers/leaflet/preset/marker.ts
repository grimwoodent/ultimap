import { ICreateMarkerPresetProperties, IMarkerPresetStrategy } from '../../interface/preset/marker';
import { markerPresetStorage } from '../utils/marker-preset-storage';

export class LeafletMarkerPresetStrategy implements IMarkerPresetStrategy {
    public create(preset: string, props: ICreateMarkerPresetProperties): IMarkerPresetStrategy {
        markerPresetStorage.add(preset, {
            icon: props.icon,
        });

        return this;
    }
}
