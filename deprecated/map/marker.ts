import { ICreateMarkerOptions, IMarkerStrategy } from './drivers/interface/marker';
import { Coords, tCoords } from './coords';
import { Icon, IIcon } from './icon';
import { Bounds } from './bounds';
import { GeoObject, IGeoObject } from './geoobject';
import { tExtraData } from './drivers/interface/index';

interface IUpdateMarkerProperties {
    icon?: IIcon;
    preset?: string;
    editable?: boolean;
    data?: tExtraData;
}

export interface IMarker extends IGeoObject<tCoords, IUpdateMarkerProperties> {
    setIcon(value: IIcon): Promise<IMarker>;
    setPreset(value: string): Promise<IMarker>;
}

export class Marker
    extends GeoObject<tCoords, Coords, IUpdateMarkerProperties, ICreateMarkerOptions>
    implements IMarker {

    protected static Coords: any = Coords;

    /**
     * Обновить параметры метки
     *
     * @param {IUpdateMarkerProperties} options
     *
     * @return {Promise<IMarker>}
     */
    public updateProperties(options?: IUpdateMarkerProperties): Promise<IMarker> {
        return new Promise((
            resolve: (marker: IMarker) => void,
            reject: (error?: string) => void,
        ) => {
            Promise.all([
                this.setData((options || {}).data),
                this.setIcon((options || {}).icon),
                this.setPreset((options || {}).preset),
                this.setEditable((options || {}).editable),
            ]).then(() => {
                resolve(this);
            }, (message) => {
                reject(message);
            });
        });
    }

    /**
     * Копировать объект
     *
     * @return {IMarker}
     */
    public clone(): IMarker {
        const clone = new (this.constructor as any)(this.strategy);

        return clone.create(this.coords.toArray(), {
            data: this.data,
            icon: this.props.icon ? this.props.icon.toObject() : undefined,
            preset: this.props.preset,
            editable: this.props.editable,
        });
    }

    /**
     * Установить иконку
     *
     * @param {IIcon} value
     *
     * @return {IMarker}
     */
    public setIcon(value: IIcon): Promise<IMarker> {
        return new Promise((
            resolve: (marker: IMarker) => void,
            reject: (error?: string) => void,
        ) => {
            if (value === undefined) {
                resolve(this);
                return;
            }

            this.props.icon = new Icon(value);

            if (this.hasInstance()) {
                this.getStrategy().setIcon(this.getInstance(), this.props.icon);

                resolve(this);
            } else {
                resolve(this);
            }

            resolve(this);
        });
    }

    /**
     * Установить стили из хранилища
     *
     * @param {string} value
     *
     * @return {Promise<IMarker>}
     */
    public setPreset(value: string): Promise<IMarker> {
        return new Promise((
            resolve: (marker: IMarker) => void,
            reject: (error?: string) => void,
        ) => {
            if (value === undefined) {
                resolve(this);
                return;
            }

            this.props.preset = value;

            if (this.hasInstance()) {
                this.getStrategy().setPreset(this.getInstance(), this.props.preset);

                resolve(this);
            } else {
                resolve(this);
            }

            resolve(this);
        });
    }

    /**
     * Получить координаты объекта
     *
     * @param {boolean} byInstance
     *
     * @return {Coords}
     */
    public getCoords(byInstance: boolean = true): Coords {
        if (byInstance) {
            return this.getStrategy().getCoords(this.getInstance());
        }

        return this.coords || null;
    }

    /**
     * Получит местоположение
     *
     * @param {boolean} byInstance
     *
     * @return {Bounds}
     */
    public getBounds(byInstance: boolean = true): Bounds {
        if (byInstance) {
            return this.getStrategy().getBounds(this.getInstance());
        }

        return this.getCoords(false).getBounds();
    }

    /**
     * Стратегия работы с маркером
     * @return {IMarkerStrategy}
     */
    protected getStrategy(): IMarkerStrategy {
        if (!this.strategy) {
            throw new Error('Geo strategy not found');
        }

        return this.strategy.marker;
    }
}
