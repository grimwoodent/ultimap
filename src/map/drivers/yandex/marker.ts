import { Api, YMarker } from './utils/ymaps';
import { IconFactory } from './utils/icon-factory';
import { IMap } from '../../index';
import { Coords } from '../../coords';
import { Icon } from '../../icon';
import { ICreateMarkerOptions, IMarkerStrategy } from '../interface/marker';
import { Bounds } from '../../bounds';
import { EventHandlerFn, IEventHandlerFnMap } from '../../events';

export class YandexMarkerStrategy implements IMarkerStrategy {
    /**
     * Create new instance of marker
     *
     * @param {Coords} coords
     * @param {ICreateMarkerOptions} props
     *
     * @returns {any}
     */
    public create(coords: Coords, props: ICreateMarkerOptions): any {
        const icon = props.icon
            ? IconFactory.createBy(props.icon)
            : {};
        const preset = props.preset
            ? { preset: props.preset }
            : {};
        const compiledProps = Object.assign({}, icon, preset);

        return new Api.ymaps.Placemark(coords.toArray(), {}, compiledProps);
    }

    /**
     * Add marker instance to map
     *
     * @param placemark
     * @param {IMap} map
     *
     * @returns {IMarkerStrategy}
     */
    public addToMap(placemark: YMarker, map: IMap): IMarkerStrategy {
        map.getInstance().geoObjects.add(placemark);

        return this;
    }

    /**
     * Remove marker instance from map
     *
     * @param placemark
     * @param map
     *
     * @returns {IMarkerStrategy}
     */
    public removeFromMap(placemark: YMarker, map: any): IMarkerStrategy {
        map.getInstance().geoObjects.remove(placemark);

        return this;
    }

    /**
     * Set marker coords
     *
     * @param {YMarker} placemark
     * @param {Coords} value
     *
     * @returns {IMarkerStrategy}
     */
    public setCoords(placemark: YMarker, value: Coords): IMarkerStrategy {
        (placemark as any).geometry.setCoordinates(value.toArray());

        return this;
    }

    /**
     * Get marker coords
     *
     * @param {YMarker} placemark
     *
     * @returns {Coords}
     */
    public getCoords(placemark: YMarker): Coords {
        return new Coords((placemark as any).geometry.getCoordinates());
    }

    /**
     * Set marker style by icon
     *
     * @param {YMarker} geoobject
     * @param {Icon} icon
     *
     * @returns {IMarkerStrategy}
     */
    public setIcon(geoobject: YMarker, icon: Icon): IMarkerStrategy {
        // @TODO implements method

        return this;
    }

    /**
     * Set marker style bt preset
     *
     * @param {YMarker} geoobject
     * @param {string} preset
     *
     * @returns {IMarkerStrategy}
     */
    public setPreset(geoobject: YMarker, preset: string): IMarkerStrategy {
        // @TODO implements method

        return this;
    }

    /**
     * Get marker bounds
     *
     * @param {YMarker} geoobject
     *
     * @returns {Bounds}
     */
    public getBounds(geoobject: YMarker): Bounds {
        // maybe use Api.ymaps marker.geometry.getBounds() method?
        return this.getCoords(geoobject).getBounds();
    }

    /**
     * Edit marker
     *
     * @param {YMarker} geoobject
     * @param {boolean} value
     *
     * @returns {IMarkerStrategy}
     */
    public setEditable(geoobject: YMarker, value: boolean): IMarkerStrategy {
        (geoobject as any).options.set('draggable', value);

        return this;
    }

    /**
     * Add event listener for marker
     *
     * @param {YMarker} geoObject
     * @param {string | IEventHandlerFnMap} type
     * @param {EventHandlerFn} fn
     * @param context
     *
     * @returns {IMarkerStrategy}
     */
    public on(
        geoObject: YMarker,
        type: string | IEventHandlerFnMap,
        fn?: EventHandlerFn, context?: any,
    ): IMarkerStrategy {
        if (!type) {
            throw new Error('Marker event name is not defined');
        }

        (geoObject as any).events.add(type as string, fn, context);

        return this;
    }

    /**
     * Remove event listener for marker
     *
     * @param {YMarker} geoObject
     * @param {string} type
     * @param {EventHandlerFn} fn
     * @param context
     *
     * @returns {IMarkerStrategy}
     */
    public off(geoObject: YMarker, type: string, fn?: EventHandlerFn, context?: any): IMarkerStrategy {
        if (!type) {
            throw new Error('Marker event name is not defined');
        }

        (geoObject as any).events.remove(type as string, fn, context);

        return this;
    }
}
