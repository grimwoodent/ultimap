import * as L from 'leaflet';
import { Marker as LMarker } from 'leaflet';
import 'leaflet-editable/src/Leaflet.Editable';
import { IMap } from '../../index';
import { Coords } from '../../coords';
import { Icon } from '../../icon';
import { ICreateMarkerOptions, IMarkerStrategy } from '../interface/marker';
import { iconFactory } from './utils/icon-factory';
import { markerPresetStorage } from './utils/marker-preset-storage';
import { Bounds } from '../../bounds';
import { EventHandlerFn, IEventHandlerFnMap } from '../../events';

export class LeafletMarkerStrategy implements IMarkerStrategy {
    public create(coords: Coords, options?: ICreateMarkerOptions): any {
        const preset = markerPresetStorage.get(options.preset);

        return L.marker(coords.toArray(), {
            icon: iconFactory.createBy(options.icon || preset.icon),
        });
    }

    /**
     * Установить на карту
     *
     * @param {LMarker} geoobject
     * @param {IMap} map
     *
     * @return {IMarkerStrategy}
     */
    public addToMap(geoobject: LMarker, map: IMap): IMarkerStrategy {
        geoobject.addTo(map.getInstance());

        return this;
    }

    /**
     * Удалить с карты
     *
     * @param {LMarker} geoobject
     * @param {IMap} map
     *
     * @return {IMarkerStrategy}
     */
    public removeFromMap(geoobject: LMarker, map: IMap): IMarkerStrategy {
        // (geoobject as any).removeFrom(map.getInstance());

        // tslint:disable-next-line:
        geoobject.removeFrom(map.getInstance());

        return this;
    }

    /**
     * Установить координаты метки
     *
     * @param {LMarker} geoobject
     * @param {Coords} value
     *
     * @return {IMarkerStrategy}
     */
    public setCoords(geoobject: LMarker, value: Coords): IMarkerStrategy {
        geoobject.setLatLng(value.toArray());

        return this;
    }

    /**
     * Получить координаты метки
     *
     * @param {LMarker} geoobject
     *
     * @return {Coords}
     */
    public getCoords(geoobject: LMarker): Coords {
        return new Coords(geoobject.getLatLng());
    }

    /**
     * Устновить иконку маркера
     *
     * @param {LMarker} geoobject
     * @param {Icon} icon
     *
     * @return {IMarkerStrategy}
     */
    public setIcon(geoobject: LMarker, icon: Icon): IMarkerStrategy {
        geoobject.setIcon(iconFactory.createBy(icon));

        return this;
    }

    /**
     * Установить пресет для маркера
     *
     * @param {LMarker} geoobject
     * @param {string} preset
     *
     * @return {IMarkerStrategy}
     */
    public setPreset(geoobject: LMarker, preset: string): IMarkerStrategy {
        const presetData = markerPresetStorage.get(preset);

        this.setIcon(geoobject, presetData.icon);

        return this;
    }

    /**
     * Получить местоположение метки
     *
     * @param geoobject
     *
     * @return {Bounds}
     */
    public getBounds(geoobject: LMarker): Bounds {
        return this.getCoords(geoobject).getBounds();
    }

    /**
     * Включить редактировние
     *
     * @param {Marker} geoobject
     * @param {boolean} value
     *
     * @return {IMarkerStrategy}
     */
    public setEditable(geoobject: LMarker, value: boolean): IMarkerStrategy {
        if (value) {
            (geoobject as any).enableEdit();
        } else {
            (geoobject as any).disableEdit();
        }

        return this;
    }

    public on(geoObject: any, type: string | IEventHandlerFnMap, fn?: EventHandlerFn, context?: any): IMarkerStrategy {
        geoObject.on(type as string, fn, context);

        return this;
    }

    public off(geoObject: any, type: string, fn?: EventHandlerFn, context?: any): IMarkerStrategy {
        geoObject.off(type as string, fn, context);

        return this;
    }
}
