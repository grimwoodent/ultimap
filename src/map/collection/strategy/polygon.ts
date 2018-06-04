import {
    Strategy,
} from '../../../collection';
import { IPolygon } from '../../polygon';

export class PolygonStrategy extends Strategy {
    /**
     * Получить индекс элемента в коллекции
     *
     * @param {IPolygon[]} collection
     * @param {IPolygon} element
     *
     * @return {number}
     */
    public getIndex(collection: IPolygon[], element: IPolygon): number {
        return collection.findIndex((collectionElement) => collectionElement.getUid() === element.getUid());
    }
}
