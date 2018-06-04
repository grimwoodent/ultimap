import {
    Strategy,
} from '../../../collection';
import { IMarker } from '../../marker';

export class MarkerStrategy extends Strategy {
    /**
     * Получить индекс элемента в коллекции
     *
     * @param {IMarker[]} collection
     * @param {IMarker} element
     *
     * @return {number}
     */
    public getIndex(collection: IMarker[], element: IMarker): number {
        return collection.findIndex((collectionElement) => collectionElement.getUid() === element.getUid());
    }
}
