import { Callbacks } from 'grim.lib';
import { Api } from '../utils/ymaps';
import {
    IMapControlStrategy,
    TGetControlInstanceHandler,
    TControlConstructor,
    IMapControlEvents,
    MAP_CONTROL_EVENTS,
} from '../../interface/map-control';
import { IAdaptedProps, PropsAdapter } from './props-adapter';

export class YandexMapControlStrategy implements IMapControlStrategy {
    public getControlInstanceConstructor(): Promise<TGetControlInstanceHandler> {
        return new Promise((resolve, reject) => {
            if (!Api.ymaps) {
                throw new Error('Yandex maps script not found');
            }

            Api.ymaps.ready(() => {
                const ControlConstructor = function Constructor(props: IAdaptedProps, events: IMapControlEvents = {}) {
                    this.callbacks = new Callbacks(events as any);

                    (ControlConstructor as any).superclass.constructor.call(this, props);
                }

                Api.ymaps.util.augment(ControlConstructor, Api.ymaps.collection.Item, {
                    onAddToMap(map: any) {
                        (ControlConstructor as any).superclass.onAddToMap.call(this, map);
                        this.getParent().getChildElement(this)
                            .then((parentDomContainer: HTMLElement) => {
                                try {
                                    this.callbacks.trigger(MAP_CONTROL_EVENTS.ON_ADD, parentDomContainer);
                                } catch (err) {
                                    console.error(err);
                                }
                            });
                    },

                    onRemoveFromMap(map: any) {
                        this.callbacks.trigger(MAP_CONTROL_EVENTS.ON_REMOVE);
                    },
                });

                resolve((props?: any, events?: IMapControlEvents) => {
                    const propsAdapter = new PropsAdapter(props);

                    return new (ControlConstructor as any)(propsAdapter.getAdapted(), events);
                });
            }, (message?: string) => {
                throw new Error(message);
            })
        });
    }
}
