import {
    IMapControlProperties,
    IMapControlStrategy, MAP_CONTROL_EVENTS,
    TControlConstructor,
    TGetControlInstanceHandler,
    TOnAddHandler,
    TOnRemoveHandler,
} from '../drivers/interface/map-control';
import { IGeoStrategy } from '../drivers/interface';
import { IMapControl, MapControl } from './map-control-instance';

export interface IMapControlConstructor {
    setConstructor(handler: TControlConstructor): IMapControlConstructor;
    setOnAddHandler(handler: TOnAddHandler): IMapControlConstructor;
    setOnRemoveHandler(handler: TOnRemoveHandler): IMapControlConstructor;
    create(props: IMapControlProperties, ...args: any[]): Promise<any>;
}

interface IProps {
    constructorHandler: TControlConstructor;
    onAddHandler: TOnAddHandler;
    onRemoveHandler: TOnRemoveHandler;
}

export class MapControlConstructor implements IMapControlConstructor {
    protected createInstanceHandler: Promise<any>;

    protected strategy: IGeoStrategy;

    protected handler: {
        constructorHandler: TControlConstructor;
        onAddHandler: TOnAddHandler;
        onRemoveHandler: TOnRemoveHandler;
    } = {
        constructorHandler: null,
        onAddHandler: null,
        onRemoveHandler: null,
    };

    constructor(strategy: IGeoStrategy) {
        if (!strategy) {
            throw new Error('Geo strategy not found');
        }

        this.strategy = strategy;
    }

    public setConstructor(handler: TControlConstructor): IMapControlConstructor {
        this.handler.constructorHandler = handler;

        return this;
    }

    public setOnAddHandler(handler: TOnAddHandler): IMapControlConstructor {
        this.handler.onAddHandler = handler;

        return this;
    }

    public setOnRemoveHandler(handler: TOnRemoveHandler): IMapControlConstructor {
        this.handler.onRemoveHandler = handler;

        return this;
    }

    /**
     * Create new control instance
     * @param args
     * @return {Promise<any>}
     */
    public create(props: IMapControlProperties, ...args: any[]): Promise<any> {
        return new Promise((
            resolve: (result: any) => void,
            reject: (msg: string) => void,
        ) => {
            try {
                if (!this.createInstanceHandler) {
                    this.createInstanceHandler = new Promise((resolve) => {
                        this.getStrategy().getControlInstanceConstructor().then(resolve);
                    });
                }

                this.createInstanceHandler.then((getInstanceHandler: TGetControlInstanceHandler) => {
                    const control = new MapControl(getInstanceHandler(props, {
                        [MAP_CONTROL_EVENTS.ON_ADD]: (parentDomNode: HTMLElement) => {
                            if (this.handler.onAddHandler) {
                                this.handler.onAddHandler.call(control, control, parentDomNode);
                            }
                        },
                        [MAP_CONTROL_EVENTS.ON_REMOVE]: () => {
                            if (this.handler.onRemoveHandler) {
                                this.handler.onRemoveHandler.call(control, control);
                            }
                        },
                    }), this.handler.constructorHandler, ...args);

                    resolve(control);
                }, () => {
                    reject('Create Control Error');
                });
            } catch (err) {
                reject(err);
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
