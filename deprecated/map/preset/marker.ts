import { IGeoStrategy } from '../drivers/interface/index';
import { ICreateMarkerPresetProperties, IMarkerPresetStrategy } from '../drivers/interface/preset/marker';

interface IMarkerPreset {
    add(preset: string, props: ICreateMarkerPresetProperties): IMarkerPreset;
}

export class MarkerPreset implements IMarkerPreset {
    protected strategy: IGeoStrategy;

    constructor(strategy: IGeoStrategy) {
        if (!strategy) {
            throw new Error('Geo strategy not found');
        }

        this.strategy = strategy;
    }

    /**
     * Добавить новый пресет
     *
     * @param {string} preset
     * @param {ICreateMarkerPresetProperties} props
     *
     * @return {IMarkerPreset}
     */
    public add(preset: string, props: ICreateMarkerPresetProperties): IMarkerPreset {
        this.getStratgy().create(preset, props);

        return this;
    }

    /**
     * Стратегия работы с объектом
     * @return {IMapStrategy}
     */
    protected getStratgy(): IMarkerPresetStrategy {
        return this.strategy.preset.marker;
    }
}
