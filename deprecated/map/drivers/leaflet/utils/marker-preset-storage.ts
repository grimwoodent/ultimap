import { Icon, IIcon } from '../../../icon';

interface IMarkerPreset {
    icon: Icon;
}

class MarkerPresetStorage {
    protected presets: { [key: string]: IMarkerPreset } = {};

    /**
     * Добавить новый пресет
     *
     * @param {string} preset
     * @param {{icon: IIcon}} props
     *
     * @return {MarkerPresetStorage}
     */
    public add(preset: string, props: {
        icon: IIcon,
    }): MarkerPresetStorage {
        this.presets[preset] = {
            icon: props.icon ? new Icon(props.icon) : null,
        };

        return this;
    }

    /**
     * Получить пресет по названию
     *
     * @param {string} preset
     *
     * @return {IMarkerPreset}
     */
    public get(preset: string): IMarkerPreset {
        if (!preset) {
            return null;
        }

        if (!this.presets[preset]) {
            throw new Error('Preset not found');
        }

        return this.presets[preset];
    }
}

export const markerPresetStorage = new MarkerPresetStorage();
