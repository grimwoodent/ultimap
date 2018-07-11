import * as L from 'leaflet';
import { Map } from 'leaflet';
import { IMapControlStrategy, TGetControlInstanceHandler, TMapControlConstructor } from '../interface/map-control';

export class LeafletMapControlStrategy implements IMapControlStrategy {
    public createConstructor(
        BaseConstructor: TMapControlConstructor,
        onAdd: (parentDomContainer: HTMLElement) => any,
        onRemove: () => any,
    ): Promise<TGetControlInstanceHandler> {
        return new Promise((resolve, reject) => {
            if (typeof(onAdd) !== 'function' || typeof(onRemove) !== 'function') {
                throw new Error('Empty constructor/destructor functions');
            }

            const ControlConstructor = function ControlConstructor(...args: any[]) {
                (BaseConstructor as any).call(this, ...args);
            }

            ControlConstructor.prototype.onAdd = function onAddMapControl(map: Map) {
                try {
                    const parentDomContainer = L.DomUtil.create('div');

                    onAdd.call(this, parentDomContainer);

                    L.DomEvent.disableScrollPropagation(parentDomContainer);
                    L.DomEvent.disableClickPropagation(parentDomContainer);

                    return parentDomContainer;
                } catch (err) {
                    console.error(err);
                }
            };

            ControlConstructor.prototype.onRemove = function onRemoveMapControl(map: Map) {
                onRemove.call(this);
            };

            resolve((...args: any[]) => new (L.Control.extend(new (ControlConstructor as any)(...args)) as any)());
        });
    }
}
