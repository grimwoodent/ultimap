import {
    ICreatePolygonPresetProperties,
    IPolygonPresetProperties,
    IPolygonPresetStrategy,
} from '../../interface/preset/polygon';
import { polygonPresetStorge } from '../utils/polygon-preset-storge';

export class LeafletPolygonPresetStrategy implements IPolygonPresetStrategy {
    public create(preset: string, props: ICreatePolygonPresetProperties): IPolygonPresetStrategy {
        polygonPresetStorge.add(preset, {
            style: props.style,
        });

        return this;
    }

    public get(preset: string): IPolygonPresetProperties {
        return polygonPresetStorge.get(preset);
    }
}
