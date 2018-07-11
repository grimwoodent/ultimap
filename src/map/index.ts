import { ICreateMapStrategyOptions, IMapStrategy } from './drivers/interface/map';
import { Coords, tCoords } from './coords';
import { Bounds } from './bounds';
import { Evented, IEvented } from './evented';

interface IUpdateMapProperties {
    center?: tCoords;
    zoom?: number;
    bounds?: [tCoords, tCoords];
}

export interface IMap extends IEvented<IUpdateMapProperties> {
    updateProperties(options?: IUpdateMapProperties): Promise<IMap>;
    create(element: HTMLElement, options?: IUpdateMapProperties): IMap;
    load(): Promise<IMap>;
    destroy(): Promise<IMap>;
    hasInstance(): boolean;
    setCenter(value: tCoords): Promise<IMap>;
    getCenter(byInstance?: boolean): Coords;
    setZoom(value: number): Promise<IMap>;
    getZoom(byInstance?: boolean): number;
    setBounds(corner1: tCoords|[tCoords, tCoords], corner2?: tCoords): Promise<IMap>;
    getBounds(byInstance?: boolean): Bounds;
    getInstance(): any;
    fitToViewport(): Promise<IMap>;
    addControl(control: any): Promise<IMap>;
    removeControl(control: any): Promise<IMap>;
}

/**
 * Компонент обертка для работы с картой по установленной стратегии
 */
export class Map extends Evented<IUpdateMapProperties, ICreateMapStrategyOptions> implements IMap {
    protected holder: HTMLElement;

    /**
     * Обновить параметры карты
     * @param {IUpdateMapProperties} options
     * @return {IMap}
     */
    public updateProperties(options?: IUpdateMapProperties): Promise<IMap> {
        return new Promise((
            resolve: (map: IMap) => void,
            reject: (error?: string) => void,
        ) => {
            Promise.all([
                this.setCenter((options || {}).center),
                this.setZoom((options || {}).zoom),
                this.setBounds((options || {}).bounds),
            ]).then(() => {
                resolve(this);
            }, (message) => {
                reject(message);
            });
        });
    }

    /**
     * Создать экземпляр карты в элементе
     *
     * @param {HTMLElement} holder
     * @param {IUpdateMapProperties} options
     *
     * @return {IMap}
     */
    public create(holder: HTMLElement, options?: IUpdateMapProperties): IMap {
        if (this.holder) {
            console.warn('Try to recreate map');
            return this;
        }

        this.holder = holder;
        this.updateProperties(options);

        return this;
    }

    /**
     * Загрузить карту
     * @return {Promise<IMap>}
     */
    public load(): Promise<IMap> {
        return new Promise((
            resolve: (map: IMap) => void,
            reject: (error?: string) => void,
        ) => {
            if (this.hasInstance()) {
                resolve(this);
                return;
            }

            if (!this.holder) {
                reject('Holder not found');
                return;
            }

            // @TODO set events for new instance
            this.getStrategy()
                .load(this.holder, this.props)
                .then((instance: any) => {
                    this.instance = instance;

                    resolve(this);
                }, (message) => {
                    reject(message);
                });
        });
    }

    /**
     * Уничтожить карту
     * @return {Promise<IMap>}
     */
    public destroy(): Promise<IMap> {
        return new Promise((
            resolve: (map: IMap) => void,
            reject: (error?: string) => void,
        ) => {
            if (!this.hasInstance()) {
                resolve(this);
                return;
            }

            this.getStrategy()
                .destroy(this.getInstance())
                .then(() => {
                    this.instance = null;

                    resolve(this);
                }, (message) => {
                    reject(message);
                });
        });
    }

    /**
     * Установить значение центра карты
     * @param {tCoords} latlng
     * @return {IMap}
     */
    public setCenter(latlng: tCoords): Promise<IMap> {
        return new Promise((
            resolve: (map: IMap) => void,
            reject: (error?: string) => void,
        ) => {
            if (latlng === undefined) {
                resolve(this);
                return;
            }

            this.props.center = new Coords(latlng);

            if (this.hasInstance()) {
                this.getStrategy()
                    .setCenter(this.getInstance(), this.props.center)
                    .then(() => {
                        resolve(this);
                    }, reject);
            } else {
                resolve(this);
            }
        });
    }

    /**
     * Получить значение центра карты
     * @param {boolean} byInstance
     * @return {Coords}
     */
    public getCenter(byInstance: boolean = true): Coords {
        if (byInstance) {
            return this.getStrategy().getCenter(this.getInstance());
        }

        return this.props.center || null;
    }

    /**
     * Установить текущее значение зума
     *
     * @param {number} value
     *
     * @return {IMap}
     */
    public setZoom(value: number): Promise<IMap> {
        return new Promise((
            resolve: (map: IMap) => void,
            reject: (error?: string) => void,
        ) => {
            if (value === undefined) {
                resolve(this);
                return;
            }

            this.props.zoom = value;

            if (this.hasInstance()) {
                this.getStrategy()
                    .setZoom(this.getInstance(), this.props.zoom)
                    .then(() => {
                        resolve(this);
                    }, reject);
            } else {
                resolve(this);
            }
        });
    }

    /**
     * Получить текущее значение зума
     * @return {number}
     */
    public getZoom(byInstance: boolean = true): number {
        if (byInstance) {
            return this.getStrategy().getZoom(this.getInstance());
        }

        return this.props.zoom || null;
    }

    /**
     * Установить область отображения карты
     * @param {tCoords | [tCoords , tCoords]} corner1
     * @param {tCoords} corner2
     * @return {Promise<IMap>}
     */
    public setBounds(corner1: tCoords|[tCoords, tCoords], corner2?: tCoords): Promise<IMap> {
        return new Promise((
            resolve: (map: IMap) => void,
            reject: (error?: string) => void,
        ) => {
            if (corner1 === undefined) {
                resolve(this);
                return;
            }

            this.props.bounds = new Bounds(corner1, corner2);

            if (this.hasInstance()) {
                this.getStrategy().setBounds(this.getInstance(), this.props.bounds).then(() => {
                    resolve(this);
                }, reject);
            } else {
                resolve(this);
            }
        });
    }

    /**
     * Получить область отображения карты
     * @return {Bounds}
     */
    public getBounds(byInstance: boolean = true): Bounds {
        if (byInstance) {
            return this.getStrategy().getBounds(this.getInstance());
        }

        return this.props.bounds || null;
    }

    /**
     * Получить элемент карты для работы со стратегиями
     * @return {any}
     */
    public getInstance(): any {
        if (!this.hasInstance()) {
            throw new Error('Map instance not found');
        }

        return this.instance;
    }

    /**
     * Обновить размер карты под размер контейнера
     *
     * @return {Promise<IMap>}
     */
    public fitToViewport(): Promise<IMap> {
        return new Promise((
            resolve: (map: IMap) => void,
            reject: (error?: string) => void,
        ) => {
            if (this.hasInstance()) {
                this.getStrategy()
                    .fitToViewport(this.getInstance())
                    .then(() => {
                        resolve(this);
                    }, reject);
            } else {
                resolve(this);
            }
        });
    }

    /**
     * Добавить элемент управления на карту
     *
     * @param control
     *
     * @return {IMap}
     */
    public addControl(control: any): Promise<IMap> {
        return new Promise((
            resolve: (map: IMap) => void,
            reject: (error?: string) => void,
        ) => {
            if (this.hasInstance()) {
                this.getStrategy()
                    .addControl(this.getInstance(), control)
                    .then(() => {
                        resolve(this);
                    }, reject);
            } else {
                resolve(this);
            }
        });
    }

    /**
     * Remove control element from map
     * @param control
     * @return {Promise<IMap>}
     */
    public removeControl(control: any): Promise<IMap> {
        return new Promise((
            resolve: (map: IMap) => void,
            reject: (error?: string) => void,
        ) => {
            if (this.hasInstance()) {
                this.getStrategy()
                    .removeControl(this.getInstance(), control)
                    .then(() => {
                        resolve(this);
                    }, reject);
            } else {
                resolve(this);
            }
        });
    }

    /**
     * Стратегия работы с картой
     * @return {IMapStrategy}
     */
    protected getStrategy(): IMapStrategy {
        return this.strategy.map;
    }
}
