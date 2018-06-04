import * as L from 'leaflet';
import { Map } from 'leaflet';
import { IMapControlStrategy, TMapControlConstructor } from '../interface/map-control';

export class LeafletMapControlStrategy implements IMapControlStrategy {
    public createConstructor(
        BaseConstructor: TMapControlConstructor,
        onAdd: (parentDomContainer: HTMLElement) => any,
        onRemove: () => any,
    ): () => any {
        if (typeof(onAdd) !== 'function' || typeof(onRemove) !== 'function') {
            throw new Error('Empty constructor/destructor functions');
        }

        const baseConstructor = new (BaseConstructor as any)();

        baseConstructor.onAdd = function onAddMapControl(map: Map) {
            try {
                const parentDomContainer = L.DomUtil.create('div');

                onAdd.call(baseConstructor, parentDomContainer);

                L.DomEvent.disableScrollPropagation(parentDomContainer);
                L.DomEvent.disableClickPropagation(parentDomContainer);

                return parentDomContainer;
            } catch (err) {
                console.error(err);
            }
        };

        baseConstructor.onRemove = function onRemoveMapControl(map: Map) {
            onRemove.call(baseConstructor);
        };

        return L.Control.extend(baseConstructor);
    }
}
