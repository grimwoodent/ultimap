import { ICreatePolygonStyle } from '../../interface/polygon';
import { IPolygonPresetProperties } from '../../interface/preset/polygon';

class PolygonPresetStorge {
    protected presets: { [key: string]: IPolygonPresetProperties } = {};

    /**
     * Добавить новый пресет
     *
     * @param {string} preset
     * @param {{style: ICreatePolygonStyle}} props
     *
     * @return {PolygonPresetStorge}
     */
    public add(preset: string, props: {
        style: ICreatePolygonStyle,
    }): PolygonPresetStorge {
        this.presets[preset] = {
            // @TODO Потенциальная ошибка, в случае не соответствия полей при обновлении и создании
            style: props.style || null,
        };

        return this;
    }

    /**
     * Получить пресет по названию
     *
     * @param {string} preset
     *
     * @return {IPolygonPresetProperties}
     */
    public get(preset: string): IPolygonPresetProperties {
        if (!preset) {
            return null;
        }

        if (!this.presets[preset]) {
            throw new Error('Preset not found');
        }

        return this.presets[preset];
    }
}

export const polygonPresetStorge = new PolygonPresetStorge();
