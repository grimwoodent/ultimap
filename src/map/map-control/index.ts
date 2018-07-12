import {
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
    create(...args: any[]): Promise<any>;
}

interface IProps {
    constructorHandler: TControlConstructor;
    onAddHandler: TOnAddHandler;
    onRemoveHandler: TOnRemoveHandler;
}

export class MapControlConstructor implements IMapControlConstructor {
    protected constructorInstance: Promise<any>;

    protected strategy: IGeoStrategy;

    protected props: {
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
        this.props.constructorHandler = handler;

        return this;
    }

    public setOnAddHandler(handler: TOnAddHandler): IMapControlConstructor {
        this.props.onAddHandler = handler;

        return this;
    }

    public setOnRemoveHandler(handler: TOnRemoveHandler): IMapControlConstructor {
        this.props.onRemoveHandler = handler;

        return this;
    }

    /**
     * Create new control instance
     * @param args
     * @return {Promise<any>}
     */
    public create(...args: any[]): Promise<any> {
        return new Promise((
            resolve: (result: any) => void,
            reject: (msg: string) => void,
        ) => {
            try {
                if (!this.constructorInstance) {
                    this.constructorInstance = new Promise((resolve) => {
                        this.getStrategy().getControlInstanceConstructor().then((constructorInstance: any) => {
                            this.constructorInstance = constructorInstance;

                            resolve(this.constructorInstance);
                        });
                    });
                }

                this.constructorInstance.then((constructorInstance) => {
                    const control = new MapControl(constructorInstance({}, {
                        [MAP_CONTROL_EVENTS.ON_ADD]: (parentDomNode: HTMLElement) => {
                            if (this.props.onAddHandler) {
                                this.props.onAddHandler.call(control, control, parentDomNode);
                            }
                        },
                        [MAP_CONTROL_EVENTS.ON_REMOVE]: () => {
                            if (this.props.onRemoveHandler) {
                                this.props.onRemoveHandler.call(control, control);
                            }
                        },
                    }), this.props.constructorHandler, ...args);

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
