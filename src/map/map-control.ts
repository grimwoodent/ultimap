import { IMapControlStrategy } from './drivers/interface/map-control';
import { IGeoStrategy } from './drivers/interface/index';

interface IMapControlProps { [key: string]: any; }
interface IMapControlEvents { [key: string]: (control: any) => void; }

export interface IMapControl {
    createConstructor(
        baseConstructor: () => void,
        onAdd: (parentDomContainer: HTMLElement) => void,
        onRemove: () => void,
    ): Promise<any>;

    createControl(props?: IMapControlProps, events?: IMapControlEvents): Promise<any>;
}

export class MapControl implements IMapControl {
    protected ControlConstructor: any;
    protected strategy: IGeoStrategy;

    constructor(strategy: IGeoStrategy) {
        if (!strategy) {
            throw new Error('Geo strategy not found');
        }

        this.strategy = strategy;
    }

    /**
     * Создать конструктор элемента управления
     *
     * @param {() => void} baseConstructor
     * @param {(parentDomContainer: HTMLElement) => void} onAdd
     * @param {() => void} onRemove
     *
     * @return {Promise<any>}
     */
    public createConstructor(
        baseConstructor: () => void,
        onAdd: (parentDomContainer: HTMLElement) => void,
        onRemove: () => void,
    ): Promise<any> {
        return new Promise((resolve: (result: any) => void) => {
            if (!this.ControlConstructor) {
                this.ControlConstructor = this.getStrategy()
                    .createConstructor(baseConstructor, onAdd, onRemove);
            }

            resolve(this.ControlConstructor);
        });
    }

    /**
     * Создать элемент управления по конструктору
     *
     * @param {IMapControlProps} props
     * @param {IMapControlEvents} events
     *
     * @return {Promise<any>}
     */
    public createControl(props?: IMapControlProps, events?: IMapControlEvents): Promise<any> {
        return new Promise((
            resolve: (result: any) => void,
            reject: (msg: string) => void,
        ) => {
            if (this.ControlConstructor) {
                resolve(new this.ControlConstructor(props, events));
            } else {
                reject('Control Constructor doesn`t created');
            }
        });
    }

    /**
     * Стратегия работы с картой
     *
     * @return {IMapControlStrategy}
     */
    protected getStrategy(): IMapControlStrategy {
        return this.strategy.mapControl;
    }
}
