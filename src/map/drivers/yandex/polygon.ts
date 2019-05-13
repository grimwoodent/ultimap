import { Api, YPolygon } from './utils/ymaps';
import { IMap } from '../../index';
import { ICreatePolygonOptions, ICreatePolygonStyle, IPolygonStrategy } from '../interface/polygon';
import { PolygonCoords } from '../../polygon-coords';
import { Bounds } from '../../bounds';
import { EventHandlerFn, IEventHandlerFnMap } from '../../events';

// @TODO move to style factory
const POLYGON_STYLE: { [key: string]: keyof (ICreatePolygonStyle); } = {
    strokeColor: 'strokeColor',
    strokeOpacity: 'strokeOpacity',
    strokeWidth: 'strokeWidth',
    fillColor: 'fillColor',
    fillOpacity: 'fillOpacity',
};
const POLYGON_PROPS: { [key: string]: keyof (ICreatePolygonOptions); } = Object.assign({

}, POLYGON_STYLE);

export class YandexPolygonStrategy implements IPolygonStrategy {
    /**
     * Create new polygon instance
     * @param {PolygonCoords} coords
     * @param {ICreatePolygonOptions} props
     * @return {any}
     */
    public create(coords: PolygonCoords, props: ICreatePolygonOptions): any {
        const preset = props.preset
            ? { preset: props.preset }
            : {};
        const compiledProps: { [key: string]: any } = Object.assign({}, preset);

        // @TODO move to style factory
        Object.keys(POLYGON_PROPS).forEach((key: string) => {
            const propKey = POLYGON_PROPS[key];
            const prop = props[propKey];

            if (prop === undefined) {
                return;
            }

            compiledProps[key] = prop;
        });

        return new Api.ymaps.Polygon(coords.toArray(), {}, compiledProps);
    }

    /**
     * Add polygon to map
     *
     * @param {YPolygon} polygon
     * @param {IMap} map
     *
     * @return {IPolygonStrategy}
     */
    public addToMap(polygon: YPolygon, map: IMap): IPolygonStrategy {
        map.getInstance().geoObjects.add(polygon);

        return this;
    }

    /**
     * Remove polygon from map
     *
     * @param {YPolygon} polygon
     * @param {IMap} map
     *
     * @return {IPolygonStrategy}
     */
    public removeFromMap(polygon: YPolygon, map: IMap): IPolygonStrategy {
        map.getInstance().geoObjects.remove(polygon);

        return this;
    }

    /**
     * @set polygon coords
     *
     * @param {YPolygon} geoObject
     * @param {PolygonCoords} value
     *
     * @return {IPolygonStrategy}
     */
    public setCoords(geoObject: YPolygon, value: PolygonCoords): IPolygonStrategy {
        // @TODO implements method
        throw new Error('Method not implemented');

        return this;
    }

    /**
     * Get polygon goords
     *
     * @param {YPolygon} geoObject
     *
     * @return {PolygonCoords}
     */
    public getCoords(geoObject: YPolygon): PolygonCoords {
        // @TODO implements method
        throw new Error('Method not implemented');

        return null;
    }

    /**
     * Get polygon bounds
     *
     * @param {YPolygon} geoobject
     *
     * @return {Bounds}
     */
    public getBounds(geoobject: YPolygon): Bounds {
        // @TODO implements method
        throw new Error('Method not implemented');

        return null;
    }

    /**
     * Set polygon styles
     *
     * @param {YPolygon} geoobject
     * @param {ICreatePolygonStyle} style
     *
     * @return {IPolygonStrategy}
     */
    public setStyle(geoobject: YPolygon, style: ICreatePolygonStyle): IPolygonStrategy {
        // @TODO implements method
        throw new Error('Method not implemented');

        return this;
    }

    /**
     * Set polygon style by preset
     *
     * @param {YPolygon} geoobject
     * @param {string} preset
     *
     * @return {IPolygonStrategy}
     */
    public setPreset(geoobject: YPolygon, preset: string): IPolygonStrategy {
        // @TODO implements method
        throw new Error('Method not implemented');

        return this;
    }

    /**
     * Set polygon editing state
     *
     * @param {YPolygon} geoObject
     * @param {boolean} value
     *
     * @return {IPolygonStrategy}
     */
    public setEditable(geoObject: YPolygon, value: boolean): IPolygonStrategy {
        if (value) {
            (geoObject as any).editor.startEditing();
        } else {
            (geoObject as any).editor.stopEditing();
        }

        return this;
    }

    /**
     * Set polygon drawing state
     *
     * @param {YPolygon} geoobject
     * @param {boolean} value
     *
     * @return {IPolygonStrategy}
     */
    public setDrawing(geoobject: YPolygon, value: boolean): IPolygonStrategy {
        // @TODO implements method
        throw new Error('Method not implemented');

        return this;
    }

    /**
     * Add event to polygon
     *
     * @param {YPolygon} geoObject
     * @param {string | IEventHandlerFnMap} type
     * @param {EventHandlerFn} fn
     * @param context
     *
     * @return {IPolygonStrategy}
     */
    public on(
        geoObject: YPolygon,
        type: string | IEventHandlerFnMap,
        fn?: EventHandlerFn, context?: any,
    ): IPolygonStrategy {
        if (!type) {
            throw new Error('Polygon event name is not defined');
        }

        (geoObject as any).events.add(type as string, fn, context);

        return this;
    }

    /**
     * Remove event from polygon
     *
     * @param {YPolygon} geoObject
     * @param {string} type
     * @param {EventHandlerFn} fn
     * @param context
     *
     * @return {IPolygonStrategy}
     */
    public off(geoObject: YPolygon, type: string, fn?: EventHandlerFn, context?: any): IPolygonStrategy {
        if (!type) {
            throw new Error('Polygon event name is not defined');
        }

        (geoObject as any).events.remove(type as string, fn, context);

        return this;
    }
}
