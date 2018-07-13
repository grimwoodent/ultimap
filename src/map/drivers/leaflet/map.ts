import * as L from 'leaflet';
import { LatLng, Map, Bounds as LBounds, MapOptions } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ICreateMapStrategyOptions, IMapStrategy } from '../interface/map';
import { Coords } from '../../coords';
import { Bounds } from '../../bounds';
import { EventHandlerFn, IEventHandlerFnMap } from '../../events';
import './style/map.less';

export class LeafletMapStrategy implements IMapStrategy {
    /**
     * Произвести загрузку карты в элемент
     * @param {HTMLElement} element
     * @param {ICreateMapStrategyOptions} options
     * @return {Promise<any>}
     */
    public load(element: HTMLElement, options: ICreateMapStrategyOptions): Promise<any> {
        return new Promise((resolve: (result: any) => void) => {
            const instance = L.map(element, { editable: true } as MapOptions).on('load', () => {
                resolve(instance);
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© <a href="https://www.openstreetmap.org/copyright" ' +
                'target="_blank">OpenStreetMap</a> contributors',
                maxZoom: 18,
            }).addTo(instance);

            const center = options.center
                ? options.center.toArray()
                : null;
            const boundsCoords = options.bounds
                ? (new LBounds(options.bounds.toArray())).getCenter()
                : null;
            const boundsCenter = boundsCoords
                ? [boundsCoords.x, boundsCoords.y] as [number, number]
                : null;

            instance.setView(center || boundsCenter, options.zoom);

            (instance as any)._controlCorners['custom'] = L.DomUtil
                .create('div', 'leaflet-custom', (instance as any)._controlContainer);
        });
    }

    /**
     * Уничтожить карту
     *
     * @param {Map} map
     *
     * @return {Promise<IMapStrategy>}
     */
    public destroy(map: Map): Promise<IMapStrategy> {
        return new Promise((resolve: (result: IMapStrategy) => void) => {
            map.remove();

            resolve(this);
        });
    }

    /**
     * Установить центр для карты
     *
     * @param {Map} map
     * @param {Coords} coords
     *
     * @return {IMapStrategy}
     */
    public setCenter(map: Map, coords: Coords): Promise<IMapStrategy> {
        return new Promise((resolve: (result: IMapStrategy) => void) => {
            // @TODO Проверка на то что можно остановить анимацию (при еще не загруженной карте все ломается)
            // map.stop();
            // @TODO listen event for complete
            map.panTo(coords.toArray());

            resolve(this);
        });
    }

    /**
     * Получить значение центра для карты
     *
     * @param {Map} map
     *
     * @return {Coords}
     */
    public getCenter(map: Map): Coords {
        const center: LatLng = map.getCenter();

        return new Coords(center.lat, center.lng);
    }

    /**
     * Установить текущее занчение зума
     * @param {Map} map
     * @param {number} value
     * @return {IMapStrategy}
     */
    public setZoom(map: Map, value: number): Promise<IMapStrategy> {
        return new Promise((resolve: (result: IMapStrategy) => void) => {
            // @TODO listen event for complete
            map.setZoom(value);

            resolve(this);
        });
    }

    /**
     * Получить текущее значение зума
     * @param {Map} map
     * @return {number}
     */
    public getZoom(map: Map): number {
        return map.getZoom();
    }

    /**
     * Установить область отображения карты
     * @param map
     * @param {Bounds} value
     * @return {IMapStrategy}
     */
    public setBounds(map: Map, value: Bounds): Promise<IMapStrategy> {
        return new Promise((resolve: (result: IMapStrategy) => void) => {
            // @TODO Проверка на то что можно остановить анимацию (при еще не загруженной карте все ломается)
            // map.stop();
            // @TODO listen event for complete change bounds
            map.fitBounds(value.toArray());

            resolve(this);
        });
    }

    /**
     * Получить область отображения карты
     * @return {Bounds}
     */
    public getBounds(map: Map): Bounds {
        const bounds = map.getBounds();
        const northEast = bounds.getNorthEast();
        const southWest = bounds.getSouthWest();

        return new Bounds({
            lat: northEast.lat,
            lng: northEast.lng,
        }, {
            lat: southWest.lat,
            lng: southWest.lng,
        });
    }

    public on(geoObject: Map, type: string | IEventHandlerFnMap, fn?: EventHandlerFn, context?: any): IMapStrategy {
        geoObject.on(type as string, fn, context);

        return this;
    }

    public off(geoObject: Map, type: string, fn?: EventHandlerFn, context?: any): IMapStrategy {
        geoObject.off(type as string, fn, context);

        return this;
    }

    /**
     * Обновить отображаемую область
     * @param {Map} map
     * @return {Promise<IMapStrategy>}
     */
    public fitToViewport(map: Map): Promise<IMapStrategy> {
        return new Promise((resolve: (result: IMapStrategy) => void) => {
            map.invalidateSize(false);

            resolve(this);
        });
    }

    /**
     * Добавить элемент управления на карту
     *
     * @param map
     * @param control
     *
     * @return {Promise<IMapStrategy>}
     */
    public addControl(map: L.Map, control: L.Control): Promise<IMapStrategy> {
        return new Promise((resolve: (result: IMapStrategy) => void) => {
            control.addTo(map);

            resolve(this);
        });
    }

    /**
     * Remove control from map
     * @param map
     * @param control
     * @return {Promise<IMapStrategy>}
     */
    public removeControl(map: L.Map, control: L.Control): Promise<IMapStrategy> {
        return new Promise((resolve: (result: IMapStrategy) => void) => {
            control.remove();

            resolve(this);
        });
    }
}
