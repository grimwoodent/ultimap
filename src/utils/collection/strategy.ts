export interface IStrategy {
    getIndex(collection: any[], element: any): number;
    has(collection: any[], element: any): boolean;
    add(collection: any[], element: any): any[];
    remove(collection: any[], element: any): any[];
}

export class Strategy implements IStrategy {
    /**
     * Get element index in collection
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
     * Is element exist in collection
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
     * Add element to collection
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
     * Remove element from collection
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
