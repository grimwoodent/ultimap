import * as L from 'leaflet';
import 'leaflet-editable/src/Leaflet.Editable';
import { Circle as LCircle, PolylineOptions as LPolylineOptions } from 'leaflet';
import { IMap } from '../../index';
import { Coords } from '../../coords';
import { Bounds } from '../../bounds';
import { ICircleStrategy, ICreateCircleOptions, ICreateCircleStyle } from '../interface/circle';
import { EventHandlerFn, IEventHandlerFnMap } from '../../events';

// @TODO move to style factory
const CIRCLE_STYLE: { [key: string]: keyof (ICreateCircleStyle); } = {
    color: 'strokeColor',
    opacity: 'strokeOpacity',
    weight: 'strokeWidth',
    fillColor: 'fillColor',
    fillOpacity: 'fillOpacity',
};
const CIRCLE_PROPS: { [key: string]: keyof (ICreateCircleOptions); } = Object.assign({

}, CIRCLE_STYLE);

export class LeafletCircleStrategy implements ICircleStrategy {
    /**
     * Create new circle
     * @param {Coords} coords
     * @param {ICreateCircleOptions} options
     * @returns {any}
     */
    public create(coords: Coords, options: ICreateCircleOptions): any {
        const props: LPolylineOptions = {};

        // @TODO move to style factory
        Object.keys(CIRCLE_PROPS).forEach((key: keyof (LPolylineOptions)) => {
            const propKey = CIRCLE_PROPS[key as string];
            const option = options[propKey];

            if (option === undefined) {
                return;
            }

            props[key] = option;
        });

        return L.circle(coords.toArray(), options.radius, props as any);
    }

    public setRadius(geoObject: LCircle, radius: number): ICircleStrategy {
        (geoObject as any).setRadius(radius);

        return this;
    }

    public getRadius(geoObject: LCircle): number {
        return (geoObject as any).getRadius();
    }

    /**
     * Add to map
     * @param {Circle} geoObject
     * @param {IMap} map
     * @returns {ICircleStrategy}
     */
    public addToMap(geoObject: LCircle, map: IMap): ICircleStrategy {
        geoObject.addTo(map.getInstance());

        return this;
    }

    /**
     * Remove circle from map
     * @param {Circle} geoObject
     * @param {IMap} map
     * @returns {ICircleStrategy}
     */
    public removeFromMap(geoObject: LCircle, map: IMap): ICircleStrategy {
        (geoObject as any).removeFrom(map.getInstance());

        return this;
    }

    /**
     * Set circle center
     * @param {Circle} geoObject
     * @param {Coords} value
     * @returns {ICircleStrategy}
     */
    public setCoords(geoObject: LCircle, value: Coords): ICircleStrategy {
        (geoObject as any).setLatLng(value.toArray());

        return this;
    }

    /**
     * Get circle coords
     * @param {Circle} geoObject
     * @returns {Coords}
     */
    public getCoords(geoObject: LCircle): Coords {
        return new Coords(geoObject.getLatLng());
    }

    /**
     * Get circle bounds
     * @param {Circle} geoObject
     * @returns {Bounds}
     */
    public getBounds(geoObject: LCircle): Bounds {
        return this.getCoords(geoObject).getBounds();
    }

    public setStyle(geoobject: any, style: ICreateCircleStyle): ICircleStrategy {
        const props: LPolylineOptions = {};

        // @TODO move to style factory
        Object.keys(CIRCLE_STYLE).forEach((key: keyof (LPolylineOptions)) => {
            const option = style[CIRCLE_STYLE[key as string]];

            if (option !== undefined) {
                props[key] = option;
            }
        });

        geoobject.setStyle(props);

        return this;
    }

    /**
     * Включить редактировние
     *
     * @param {Marker} geoObject
     * @param {boolean} value
     *
     * @return {IMarkerStrategy}
     */
    public setEditable(geoObject: LCircle, value: boolean): ICircleStrategy {
        if (value) {
            (geoObject as any).enableEdit();
        } else {
            (geoObject as any).disableEdit();
        }

        return this;
    }

    /**
     * Add event handler
     * @param geoObject
     * @param {string | IEventHandlerFnMap} type
     * @param {EventHandlerFn} fn
     * @param context
     * @returns {ICircleStrategy}
     */
    public on(geoObject: any, type: string | IEventHandlerFnMap, fn?: EventHandlerFn, context?: any): ICircleStrategy {
        if (!type) {
            throw new Error('Marker event name is not defined');
        }

        geoObject.on(type as string, fn, context);

        return this;
    }

    /**
     * Remove event handler
     * @param geoObject
     * @param {string} type
     * @param {EventHandlerFn} fn
     * @param context
     * @returns {ICircleStrategy}
     */
    public off(geoObject: any, type: string, fn?: EventHandlerFn, context?: any): ICircleStrategy {
        if (!type) {
            throw new Error('Marker event name is not defined');
        }

        geoObject.off(type as string, fn, context);

        return this;
    }
}
