import { IGeoStrategy } from '../drivers/interface/index';
import {
    ICreatePolygonPresetProperties,
    IPolygonPresetProperties,
    IPolygonPresetStrategy,
} from '../drivers/interface/preset/polygon';

interface IPolygonPreset {
    add(preset: string, props: ICreatePolygonPresetProperties): IPolygonPreset;
    get(preset: string): IPolygonPresetProperties;
}

export class PolygonPreset implements IPolygonPreset {
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
     * @param {ICreatePolygonPresetProperties} props
     *
     * @return {IPolygonPreset}
     */
    public add(preset: string, props: ICreatePolygonPresetProperties): IPolygonPreset {
        this.getStratgy().create(preset, props);

        return this;
    }

    /**
     * Получить пресет по названию
     * @param {string} preset
     * @return {IPolygonPresetProperties}
     */
    public get(preset: string): IPolygonPresetProperties {
        return this.getStratgy().get(preset);
    }

    /**
     * Стратегия работы с объектом
     * @return {IMapStrategy}
     */
    protected getStratgy(): IPolygonPresetStrategy {
        return this.strategy.preset.polygon;
    }
}
