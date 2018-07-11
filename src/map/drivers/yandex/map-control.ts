import { Api } from './utils/ymaps';
import { IMapControlStrategy, TGetControlInstanceHandler, TMapControlConstructor } from '../interface/map-control';

export class YandexMapControlStrategy implements IMapControlStrategy {
    public createConstructor(
        BaseConstructor: TMapControlConstructor,
        onAdd: (parentDomContainer: HTMLElement) => any,
        onRemove: () => any,
    ): Promise<TGetControlInstanceHandler> {
        return new Promise((resolve, reject) => {
            if (typeof(onAdd) !== 'function' || typeof(onRemove) !== 'function') {
                throw new Error('Empty constructor/destructor functions');
            }

            if (!Api.ymaps) {
                throw new Error('Yandex maps script not found');
            }

            Api.ymaps.ready(() => {
                const ymapsOptions = {}; // @TODO config this
                const ControlConstructor = function Constructor(...args: any[]) {
                    (BaseConstructor as any).call(this, ...args);
                    (ControlConstructor as any).superclass.constructor.call(this, ymapsOptions);
                }

                Api.ymaps.util.augment(ControlConstructor, Api.ymaps.collection.Item, {
                    onAddToMap(map: any) {
                        (ControlConstructor as any).superclass.onAddToMap.call(this, map);
                        this.getParent().getChildElement(this)
                            .then((parentDomContainer: HTMLElement) => {
                                try {
                                    onAdd.call(ControlConstructor, parentDomContainer);
                                } catch (err) {
                                    console.error(err);
                                }
                            });
                    },

                    onRemoveFromMap(map: any) {
                        onRemove.call(ControlConstructor);
                    },
                });

                resolve(function GetInstance(...args: any[]) {
                    return new (ControlConstructor as any)(...args);
                });
            }, (message?: string) => {
                throw new Error(message);
            })
        });
    }
}
