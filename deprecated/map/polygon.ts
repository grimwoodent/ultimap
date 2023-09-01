import { GeoObject, IGeoObject } from './geoobject';
import { PolygonCoords, tPolygonCoords } from './polygon-coords';
import { ICreatePolygonOptions, IPolygonStrategy } from './drivers/interface/polygon';
import { Bounds } from './bounds';
import { tExtraData } from './drivers/interface/index';

interface IUpdatePolygonStyle {
    fillColor?: string;
    fillOpacity?: number;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWidth?: number;
    preset?: string;
}

interface IUpdatePolygonProperties extends IUpdatePolygonStyle {
    editable?: boolean;
    data?: tExtraData;
}

export interface IPolygon extends IGeoObject<tPolygonCoords, IUpdatePolygonProperties> {
    setStyle(style: IUpdatePolygonStyle): Promise<IPolygon>;
    setPreset(value: string): Promise<IPolygon>;
    setDrawing(value: boolean): Promise<IPolygon>;
}

export class Polygon
    extends GeoObject<tPolygonCoords, PolygonCoords, IUpdatePolygonProperties, ICreatePolygonOptions>
    implements IPolygon {

    protected static Coords: any = PolygonCoords;

    public updateProperties(options?: IUpdatePolygonProperties): Promise<IPolygon> {
        return new Promise((
            resolve: (result: IPolygon) => void,
            reject: (error?: string) => void,
        ) => {
            Promise.all([
                this.setData((options || {}).data),
                this.setStyle(options),
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
     * @return {IPolygon}
     */
    public clone(): IPolygon {
        const clone = new (this.constructor as any)(this.strategy);

        return clone.create(this.coords.toArray(), {
            data: this.data,
            preset: this.props.preset,
            editable: this.props.editable,

            // @TODO Подумать над более красивым решением
            fillColor: this.props.fillColor,
            fillOpacity: this.props.fillOpacity,
            strokeColor: this.props.strokeColor,
            strokeOpacit: this.props.strokeOpacity,
            strokeWidth: this.props.strokeWidth,
        });
    }

    /**
     * Установить стили для полигона
     *
     * @param {IUpdatePolygonStyle} value
     *
     * @return {Promise<IPolygon>}
     */
    public setStyle(value: IUpdatePolygonStyle): Promise<IPolygon> {
        return new Promise((
            resolve: (result: IPolygon) => void,
            reject: (error?: string) => void,
        ) => {
            if (value === undefined) {
                resolve(this);
                return;
            }

            // @TODO Подумать над более красивым решением
            this.props.fillColor = value.fillColor || this.props.fillColor;
            this.props.fillOpacity = value.fillOpacity || this.props.fillOpacity;
            this.props.strokeColor = value.strokeColor || this.props.strokeColor;
            this.props.strokeOpacity = value.strokeOpacity || this.props.strokeOpacity;
            this.props.strokeWidth = value.strokeWidth || this.props.strokeWidth;

            if (this.hasInstance()) {
                this.getStrategy().setStyle(this.getInstance(), this.props);
                resolve(this);
            } else {
                resolve(this);
            }
        });
    }

    /**
     * Установить пресет
     * @param {string} value
     * @return {Promise<IPolygon>}
     */
    public setPreset(value: string): Promise<IPolygon> {
        return new Promise((
            resolve: (result: IPolygon) => void,
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
     * Получить местоположение объекта
     * @param {boolean} byInstance
     * @return {Bounds}
     */
    public getBounds(byInstance: boolean = true): Bounds {
        if (byInstance) {
            return this.getStrategy().getBounds(this.getInstance());
        }

        return this.getCoords(false).getBounds();
    }

    /**
     * Начать рисовать полигон
     *
     * @param {boolean} value
     *
     * @return {Promise<IPolygon>}
     */
    public setDrawing(value: boolean): Promise<IPolygon> {
        return new Promise((
            resolve: (result: IPolygon) => void,
            reject: (error?: string) => void,
        ) => {
            if (!this.hasInstance()) {
                resolve(this);
                return;
            }

            if (value) {
                this.setEditable(true).then(() => {
                    this.getStrategy().setDrawing(this.getInstance(), value);

                    resolve(this);
                }, reject);
                return;
            }

            this.setEditable(false).then(resolve, reject);
        });
    }

    /**
     * Стратегия работы с полигоном
     * @return {IPolygonStrategy}
     */
    protected getStrategy(): IPolygonStrategy {
        if (!this.strategy) {
            throw new Error('Geo strategy not found');
        }

        return this.strategy.polygon;
    }
}
