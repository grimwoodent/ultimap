import { Map } from './index';
import { Bounds } from './bounds';
import {
    ICreateGeoObjectOptions,
    IEditableGeoObjectStrategy, IGeoStrategy,
    IUpdateGeoObjectOptions,
    tExtraData,
} from './drivers/interface/index';
import { Evented, IEvented } from './evented';
import { uid } from './utils/index';

export interface IGeoObject<TC, TP> extends IEvented<TP> {
    create(coords: TC, props?: TP): IGeoObject<TC, TP>;

    getUid(): string;

    setCoords(value: TC): Promise<IGeoObject<TC, TP>>;
    getCoords(byInstance: boolean): any;
    getBounds(byInstance: boolean): Bounds;

    addTo(map: Map): IGeoObject<TC, TP>;
    remove(): IGeoObject<TC, TP>;
    getMap(): Map;
    onMap(): boolean;
    clone(): IGeoObject<TC, TP>;

    setEditable(value: boolean): Promise<IGeoObject<TC, TP>>;

    setData(value: tExtraData): Promise<IGeoObject<TC, TP>>;
    getData(): tExtraData;
}

export abstract class GeoObject<
    TCoordsForUpdate,
    TCoords,
    TPropertiesForUpdate extends IUpdateGeoObjectOptions,
    TPropertiesForCreate extends ICreateGeoObjectOptions
>
extends Evented<TPropertiesForUpdate, TPropertiesForCreate>
implements IGeoObject<TCoordsForUpdate, TPropertiesForUpdate> {

    protected static Coords: any = null;

    protected map: Map;
    protected coords: TCoords;
    protected data: tExtraData = {};

    constructor(strategy: IGeoStrategy) {
        super(strategy);
        this.data.uid = uid.next();
        this.data.name = '';
    }

    /**
     * Создаем новый экземпляр с параметрами
     *
     * @param {TCoordsForUpdate} coords
     * @param {TPropertiesForUpdate} options
     *
     * @return {any}
     */
    public create(coords: TCoordsForUpdate, options?: TPropertiesForUpdate): any {
        this.setCoords(coords);
        this.updateProperties(options);

        return this;
    }

    /**
     * Получить уникальный ключ объекта
     *
     * @return {string}
     */
    public getUid(): string {
        return this.getData().uid;
    }

    /**
     * Получить элемент для работы со стратегиями
     *
     * @return {any}
     */
    public getInstance(createNewInstance: boolean = false): any {
        if (this.hasInstance()) {
            return this.instance;
        }

        if (!createNewInstance) {
            throw new Error('Instance not found');
        }

        // set events for new instance in addTo method
        this.instance = this.getStrategy().create(this.coords, this.props);

        return this.instance;
    }

    /**
     * Установить координаты геообъекта
     *
     * @return {Promise<IGeoObject>}
     */
    public setCoords(value: TCoordsForUpdate): Promise<IGeoObject<TCoordsForUpdate, TPropertiesForUpdate>> {
        return new Promise((
            resolve: (result: IGeoObject<TCoordsForUpdate, TPropertiesForUpdate>) => void,
            reject: (error?: string) => void,
        ) => {
            if (value === undefined) {
                resolve(this);
                return;
            }

            this.coords = new (this.constructor as any).Coords(value);

            if (this.hasInstance()) {
                this.getStrategy().setCoords(this.getInstance(), this.coords);
                resolve(this);
            } else {
                resolve(this);
            }
        });
    }

    /**
     * Получить координаты объекта
     *
     * @param {boolean} byInstance
     *
     * @return {Coords}
     */
    public getCoords(byInstance: boolean = true): TCoords {
        if (byInstance) {
            return this.getStrategy().getCoords(this.getInstance());
        }

        return this.coords || null;
    }

    /**
     * Получит местоположение
     *
     * @param {boolean} byInstance
     *
     * @return {Bounds}
     */
    public abstract getBounds(byInstance: boolean): Bounds;

    /**
     * Установить объект на карту
     *
     * @param {Map} map
     *
     * @return {IGeoObject}
     */
    public addTo(map: Map): IGeoObject<TCoordsForUpdate, TPropertiesForUpdate> {
        if (this.onMap()) {
            this.remove();
        }

        this.getStrategy().addToMap(this.getInstance(true), map);
        this.map = map;

        // Обновим параметры которые нельзя выставить напрямую через создание или которые работают только на карте
        this.events.resetAll();
        this.setEditable(this.props.editable || false);

        return this;
    }

    /**
     * Удалить геообъект с карты
     *
     * @return {IGeoObject}
     */
    public remove(): IGeoObject<TCoordsForUpdate, TPropertiesForUpdate> {
        if (this.onMap()) {
            this.events.removeAll();
            this.getStrategy().removeFromMap(this.getInstance(), this.getMap());
            this.map = null;
        }

        return this;
    }

    /**
     * Получить текущую карту
     *
     * @return {Map}
     */
    public getMap(): Map {
        return this.map || null;
    }

    /**
     * Находится ли объект на карте
     *
     * @return {boolean}
     */
    public onMap(): boolean {
        return !!this.getMap() && this.hasInstance();
    }

    /**
     * Копировать текущий объект
     * @return {IGeoObject<TCoordsForUpdate, TPropertiesForUpdate extends IUpdateGeoObjectOptions>}
     */
    public abstract clone(): IGeoObject<TCoordsForUpdate, TPropertiesForUpdate>;

    /**
     * Установить состояние редактирования
     *
     * @param {boolean} value
     *
     * @return {Promise<IGeoObject>}
     */
    public setEditable(value: boolean): Promise<IGeoObject<TCoordsForUpdate, TPropertiesForUpdate>> {
        return new Promise((
            resolve: (result: IGeoObject<TCoordsForUpdate, TPropertiesForUpdate>) => void,
            reject: (error?: string) => void,
        ) => {
            if (value === undefined) {
                resolve(this);
                return;
            }

            this.props.editable = value;

            if (this.hasInstance()) {
                this.getStrategy().setEditable(this.getInstance(), this.props.editable);
                resolve(this);
            } else {
                resolve(this);
            }
        });
    }

    public setData(value: tExtraData): Promise<IGeoObject<TCoordsForUpdate, TPropertiesForUpdate>> {
        return new Promise((
            resolve: (result: IGeoObject<TCoordsForUpdate, TPropertiesForUpdate>) => void,
            reject: (error?: string) => void,
        ) => {
            if (value === undefined) {
                resolve(this);
                return;
            }

            this.data = Object.assign(this.data || {}, value);

            resolve(this);
        });
    }

    public getData(): tExtraData {
        return this.data || {};
    }

    /**
     * Стратегия работы с геообъектом
     * @return {IEditableGeoObjectStrategy}
     */
    protected abstract getStrategy(): IEditableGeoObjectStrategy<TCoords, TPropertiesForCreate>;
}
