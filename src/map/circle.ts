import { GeoObject, IGeoObject } from './geoobject';
import { Coords, tCoords } from './coords';
import { tExtraData } from './drivers/interface/index';
import { ICircleStrategy, ICreateCircleOptions } from './drivers/interface/circle';
import { Bounds } from './bounds';
import { IEvented } from './evented';

interface IUpdateCircleStyle {
    fillColor?: string;
    fillOpacity?: number;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWidth?: number;
    preset?: string;
}

interface IUpdateCircleProperties extends IUpdateCircleStyle {
    radius?: number;
    editable?: boolean;
    data?: tExtraData;
}

export interface ICircle extends IGeoObject<tCoords, IUpdateCircleProperties> {
    setStyle(style: IUpdateCircleStyle): Promise<ICircle>;
    setRadius(radius: number): Promise<ICircle>;
    getRadius(byInstance: boolean): number;
}

export class Circle
    extends GeoObject<tCoords, Coords, IUpdateCircleProperties, ICreateCircleOptions>
    implements ICircle {

    protected static Coords: any = Coords;

    /**
     * Update circle properties
     * @param {IUpdateCircleProperties} options
     * @returns {Promise<IEvented<IUpdateCircleProperties>>}
     */
    public updateProperties(options?: IUpdateCircleProperties): Promise<IEvented<IUpdateCircleProperties>> {
        return new Promise((
            resolve: (marker: ICircle) => void,
            reject: (error?: string) => void,
        ) => {
            Promise.all([
                this.setData((options || { }).data),
                this.setRadius((options || { }).radius),
                this.setStyle(options),
                this.setEditable((options || { }).editable),
            ]).then(() => {
                resolve(this);
            }, (message) => {
                reject(message);
            });
        });
    }

    public setRadius(radius: number): Promise<ICircle> {
        return new Promise((
            resolve: (result: ICircle) => void,
            reject: (error?: string) => void,
        ) => {
            if (radius === undefined) {
                resolve(this);
                return;
            }

            this.props.radius = radius;

            if (this.hasInstance()) {
                this.getStrategy().setRadius(this.getInstance(), radius);
                resolve(this);
            } else {
                resolve(this);
            }
        });
    }

    public getRadius(byInstance: boolean = true): number {
        if (byInstance) {
            return this.getStrategy().getRadius(this.getInstance());
        }

        return this.props.radius;
    }

    /**
     * Clone object with all properties
     * @returns {IGeoObject<tCoords, IUpdateCircleProperties>}
     */
    public clone(): IGeoObject<tCoords, IUpdateCircleProperties> {
        const clone = new (this.constructor as any)(this.strategy);

        return clone.create(this.coords.toArray(), {
            data: this.data,
            radius: this.props.radius,

            // @TODO Подумать над более красивым решением
            fillColor: this.props.fillColor,
            fillOpacity: this.props.fillOpacity,
            strokeColor: this.props.strokeColor,
            strokeOpacit: this.props.strokeOpacity,
            strokeWidth: this.props.strokeWidth,
        });
    }

    public setStyle(value: IUpdateCircleStyle): Promise<ICircle> {
        return new Promise((
            resolve: (result: ICircle) => void,
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

    public getBounds(byInstance: boolean = true): Bounds {
        if (byInstance) {
            return this.getStrategy().getBounds(this.getInstance());
        }

        return this.getCoords(false).getBounds();
    }

    protected getStrategy(): ICircleStrategy {
        if (!this.strategy) {
            throw new Error('Geo strategy not found');
        }

        return this.strategy.circle;
    }
}
