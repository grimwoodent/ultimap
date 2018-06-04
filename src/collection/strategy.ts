export interface IStrategy {
    getIndex(collection: any[], element: any): number;
    has(collection: any[], element: any): boolean;
    add(collection: any[], element: any): any[];
    remove(collection: any[], element: any): any[];
}

export class Strategy implements IStrategy {
    /**
     * Получить индекс элемента в коллекции
     *
     * @param {any[]} collection
     * @param element
     *
     * @return {number}
     */
    public getIndex(collection: any[], element: any): number {
        return collection.findIndex((collectionElement) => collectionElement === element);
    }

    /**
     * Есть ли элемент в коллекции
     *
     * @param {any[]} collection
     * @param element
     *
     * @return {boolean}
     */
    public has(collection: any[], element: any): boolean {
        return !!~this.getIndex(collection, element);
    }

    /**
     * Добавить элемент в коллекцию
     *
     * @param {any[]} collection
     * @param element
     *
     * @return {any[]}
     */
    public add(collection: any[], element: any): any[] {
        if (this.has(collection, element)) {
            return collection;
        }

        return [].concat(collection, element);
    }

    /**
     * Удалить элемента из коллекции
     *
     * @param {any[]} collection
     * @param element
     *
     * @return {any[]}
     */
    public remove(collection: any[], element: any): any[] {
        if (!this.has(collection, element)) {
            return collection;
        }

        const idx = this.getIndex(collection, element);
        const result = [].concat(collection);

        result.splice(idx, 1);

        return result;
    }
}
