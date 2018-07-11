import { IMapControlStrategy, TGetControlInstanceHandler } from './drivers/interface/map-control';
import { IGeoStrategy } from './drivers/interface/index';

export interface IMapControl {
    createConstructor(
        baseConstructor: (...args: any[]) => void,
        onAdd: (parentDomContainer: HTMLElement) => void,
        onRemove: () => void,
    ): Promise<void>;

    createControl(...args: any[]): Promise<any>;
}

export class MapControl implements IMapControl {
    protected ControlConstructor: TGetControlInstanceHandler;
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
    ): Promise<void> {
        return new Promise((resolve: (result: any) => void) => {
            if (!this.ControlConstructor) {
                this.getStrategy()
                    .createConstructor(baseConstructor, onAdd, onRemove)
                    .then((ControlConstructor) => {
                        this.ControlConstructor = ControlConstructor;
                        resolve(null);
                    });
            } else {
                resolve(null);
            }
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
    public createControl(...args: any[]): Promise<any> {
        return new Promise((
            resolve: (result: any) => void,
            reject: (msg: string) => void,
        ) => {
            if (this.ControlConstructor) {
                resolve(this.ControlConstructor(...args));
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
