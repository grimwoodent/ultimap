import * as L from 'leaflet';
import { Polygon as LPolygon, PolylineOptions as LPolylineOptions } from 'leaflet';
import { IMap } from '../../index';
import { ICreatePolygonOptions, ICreatePolygonStyle, IPolygonStrategy } from '../interface/polygon';
import { PolygonCoords } from '../../polygon-coords';
import { Bounds } from '../../bounds';
import { polygonPresetStorge } from './utils/polygon-preset-storge';
import { EventHandlerFn, IEventHandlerFnMap } from '../../events';
import { UtilsPolygonCoords } from '../../utils/polygon-coords';

// @TODO move to style factory
const POLYGON_STYLE: { [key: string]: keyof (ICreatePolygonStyle); } = {
    color: 'strokeColor',
    opacity: 'strokeOpacity',
    weight: 'strokeWidth',
    fillColor: 'fillColor',
    fillOpacity: 'fillOpacity',
};
const POLYGON_PROPS: { [key: string]: keyof (ICreatePolygonOptions); } = Object.assign({

}, POLYGON_STYLE);

export class LeafletPolygonStrategy implements IPolygonStrategy {
    public create(coords: PolygonCoords, options?: ICreatePolygonOptions): any {
        const preset = polygonPresetStorge.get(options.preset);
        const props: LPolylineOptions = {};

        // @TODO move to style factory
        Object.keys(POLYGON_PROPS).forEach((key: keyof (LPolylineOptions)) => {
            const propKey = POLYGON_PROPS[key];
            let option = options[propKey];

            if (option === undefined) {
                if (!preset || !preset.style) {
                    return;
                }

                option = preset.style[propKey];

                if (option === undefined) {
                    return;
                }
            }

            props[key] = option;
        });

        return L.polygon(coords.toArray(), props);
    }

    public addToMap(geoobject: LPolygon, map: IMap): IPolygonStrategy {
        geoobject.addTo(map.getInstance());

        return this;
    }

    public removeFromMap(geoobject: LPolygon, map: IMap): IPolygonStrategy {
        geoobject.removeFrom(map.getInstance());

        return this;
    }

    public setCoords(geoobject: LPolygon, value: PolygonCoords): IPolygonStrategy {
        geoobject.setLatLngs(value.toArray());

        return this;
    }

    public getCoords(geoobject: LPolygon): PolygonCoords {
        return new PolygonCoords(UtilsPolygonCoords.toNumbers(geoobject.getLatLngs()) as Array<[number, number]>);
    }

    public getBounds(geoobject: LPolygon): Bounds {
        const bounds = geoobject.getBounds();

        return new Bounds(bounds.getNorthWest(), bounds.getSouthWest());
    }

    /**
     * Установить стили для полигона
     *
     * @param geoobject
     * @param {ICreatePolygonStyle} style
     *
     * @return {IPolygonStrategy}
     */
    public setStyle(geoobject: LPolygon, style: ICreatePolygonStyle): IPolygonStrategy {
        const props: LPolylineOptions = {};

        // @TODO move to style factory
        Object.keys(POLYGON_STYLE).forEach((key: keyof (LPolylineOptions)) => {
            const option = style[POLYGON_STYLE[key]];

            if (option !== undefined) {
                props[key] = option;
            }
        });

        geoobject.setStyle(props);

        return this;
    }

    /**
     * Установить пресет
     *
     * @param geoobject
     * @param {string} preset
     *
     * @return {IPolygonStrategy}
     */
    public setPreset(geoobject: LPolygon, preset: string): IPolygonStrategy {
        const presetData = polygonPresetStorge.get(preset);

        this.setStyle(geoobject, presetData.style);

        return this;
    }

    /**
     * Установить состояние редактирования
     *
     * @param geoobject
     * @param {boolean} value
     *
     * @return {IPolygonStrategy}
     */
    public setEditable(geoobject: LPolygon, value: boolean): IPolygonStrategy {
        if (value) {
            (geoobject as any).enableEdit();
        } else {
            (geoobject as any).disableEdit();
        }

        return this;
    }

    /**
     * Установить состояние рисования
     * @param {Polygon} geoobject
     * @param {boolean} value
     * @return {IPolygonStrategy}
     */
    public setDrawing(geoobject: LPolygon, value: boolean): IPolygonStrategy {
        if (!value) {
            (geoobject as any).stopDrawing();

            return this;
        }

        if (!(geoobject as any).editEnabled()) {
            this.setEditable(geoobject, true);
        }

        (geoobject as any).editor.startDrawingForward();

        return this;
    }

    public on(
        geoObject: LPolygon,
        type: string | IEventHandlerFnMap,
        fn?: EventHandlerFn, context?: any,
    ): IPolygonStrategy {
        geoObject.on(type as string, fn, context);

        return this;
    }

    public off(geoObject: LPolygon, type: string, fn?: EventHandlerFn, context?: any): IPolygonStrategy {
        geoObject.off(type as string, fn, context);

        return this;
    }
}
