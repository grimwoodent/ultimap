import { Api } from './utils/ymaps';
import { ICreateMapStrategyOptions, IMapStrategy } from '../interface/map';
import { Coords } from '../../coords';
import { Bounds } from '../../bounds';
import { EventHandlerFn, IEventHandlerFnMap } from '../../events';

export class YandexMapStrategy implements IMapStrategy {
    /**
     * Load map to element
     * @param {HTMLElement} element
     * @param {ICreateMapStrategyOptions} options
     * @return {Promise<any>}
     */
    public load(element: HTMLElement, options?: ICreateMapStrategyOptions): Promise<any> {
        return new Promise((
            resolve: (result: any) => void,
            reject: (message?: string) => void,
        ) => {
            if (!Api.ymaps) {
                reject('Yandex maps script not found');
                return;
            }

            Api.ymaps.ready(() => {
                // @TODO options
                const instance = new Api.ymaps.Map(element, {
                    center: options.center
                        ? options.center.toArray()
                        : null,
                    bounds: options.bounds
                        ? options.bounds.toArray()
                        : null,
                    zoom: options.zoom,
                });

                resolve(instance);
            }, (message?: string) => {
                reject(message);
            });
        });
    }

    /**
     * Destroy map instance
     *
     * @param {Map} map
     *
     * @return {Promise<IMapStrategy>}
     */
    public destroy(map: any): Promise<IMapStrategy> {
        return new Promise((resolve: (result: IMapStrategy) => void) => {
            map.destroy();

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
    public setCenter(map: any, coords: Coords): Promise<IMapStrategy> {
        return new Promise((resolve: (result: IMapStrategy) => void) => {
            map.setCenter(coords.toArray()).then(() => {
                resolve(this);
            });
        });
    }

    /**
     * Получить значение центра для карты
     *
     * @param {Map} map
     *
     * @return {Coords}
     */
    public getCenter(map: any): Coords {
        const center = map.getCenter();

        return new Coords(center);
    }

    /**
     * Установить текущее занчение зума
     * @param {Map} map
     * @param {number} value
     * @return {IMapStrategy}
     */
    public setZoom(map: any, value: number): Promise<IMapStrategy> {
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
    public getZoom(map: any): number {
        return map.getZoom();
    }

    /**
     * Установить область отображения карты
     * @param map
     * @param {Bounds} value
     * @return {IMapStrategy}
     */
    public setBounds(map: any, value: Bounds): Promise<IMapStrategy> {
        return new Promise((resolve: (result: IMapStrategy) => void) => {
            map.setBounds(value.toArray()).then(() => {
                resolve(this);
            });
        });
    }

    /**
     * Получить область отображения карты
     * @return {Bounds}
     */
    public getBounds(map: any): Bounds {
        const bounds = map.getBounds();

        return new Bounds(bounds);
    }

    /**
     * Обновить отображаемую область
     * @param {Map} map
     * @return {Promise<IMapStrategy>}
     */
    public fitToViewport(map: any): Promise<IMapStrategy> {
        return new Promise((resolve: (result: IMapStrategy) => void) => {
            map.container.fitToViewport();

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
    public addControl(map: any, control: any): Promise<IMapStrategy> {
        return new Promise((resolve: (result: IMapStrategy) => void) => {
            map.controls.add(control);

            resolve(this);
        });
    }

    /**
     * Remove control from map
     * @param map
     * @param control
     * @return {Promise<IMapStrategy>}
     */
    public removeControl(map: any, control: any): Promise<IMapStrategy> {
        return new Promise((resolve: (result: IMapStrategy) => void) => {
            map.controls.remove(control);

            resolve(this);
        });
    }

    public on(geoObject: any, type: string | IEventHandlerFnMap, fn?: EventHandlerFn, context?: any): IMapStrategy {
        geoObject.events.add(type as string, fn, context);

        return this;
    }

    public off(geoObject: any, type: string, fn?: EventHandlerFn, context?: any): IMapStrategy {
        geoObject.events.remove(type as string, fn, context);

        return this;
    }
}
