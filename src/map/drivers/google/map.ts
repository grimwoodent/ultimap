import { Api } from './utils/google';
import { ICreateMapStrategyOptions, IMapStrategy } from '../interface/map';
import { Coords } from '../../coords';
import { Bounds } from '../../bounds';
import { EventHandlerFn, IEventHandlerFnMap } from '../../events';

export class GoogleMapStrategy implements IMapStrategy {
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
            if (!Api.google) {
                reject('Google maps script not found');
                return;
            }

            const centerCoords = options.center
                ? options.center.toLatLng()
                : null;
            const boundsCenterCoords = options.bounds
                ? options.bounds.getCenter().toLatLng
                : null;
            const instance = new Api.google.maps.Map(element, {
                center: centerCoords || boundsCenterCoords,
                zoom: options.zoom,
            });

            resolve(instance);
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
        throw new Error('Google maps cant be destroyed. https://issuetracker.google.com/issues/35821412#comment32');
    }

    public setCenter(map: any, value: Coords): Promise<IMapStrategy> {
        return null;
    }

    public getCenter(map: any): Coords {
        return null;
    }

    public setZoom(map: any, value: number): Promise<IMapStrategy> {
        return null;
    }

    public getZoom(map: any): number {
        return null;
    }

    public setBounds(map: any, value: Bounds): Promise<IMapStrategy> {
        return null;
    }

    public getBounds(map: any): Bounds {
        return null;
    }

    public fitToViewport(map: any): Promise<IMapStrategy> {
        return null;
    }

    public addControl(map: any, control: any): Promise<IMapStrategy> {
        return null;
    }

    public removeControl(map: any, control: any): Promise<IMapStrategy> {
        return null;
    }

    public on(geoObject: any, type: string | IEventHandlerFnMap, fn?: EventHandlerFn, context?: any): IMapStrategy {
        return null;
    }

    public off(geoObject: any, type: string, fn?: EventHandlerFn, context?: any): IMapStrategy {
        return null;
    }
}
