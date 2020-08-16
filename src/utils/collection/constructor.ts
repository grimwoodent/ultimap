import { IStrategy } from './strategy';

export interface ICollections {
    replaceAllIn(key: string, elements: any[]): ICollections;
    addTo(key: string, element: any): ICollections;
    removeFrom(key: string, element: any): ICollections;
    hasIn(key: string, element: any): boolean;
    clear(key: string): ICollections;
    getAllFrom(key: string): any[];
    isEmpty(key: string): boolean;
    keys(): string[];
    addStrategy(key: string, strategy: IStrategy): ICollections;
    removeStrategy(key: string): ICollections;
}

export class Collections implements ICollections {
    protected strategies: { [key: string]: IStrategy } = {};
    protected storages: { [key: string]: any[] } = {};

    constructor(strategies: { [key: string]: IStrategy }) {
        Object.keys(strategies).forEach((key) => {
            this.addStrategy(key, strategies[key]);
        });
    }

    /**
     * Replace all elements in collection
     *
     * @param {string} key
     * @param {any[]} elements
     *
     * @return {ICollections}
     */
    public replaceAllIn(key: string, elements: any[]): ICollections {
        this.storages[key] = elements;

        return this;
    }

    /**
     * Add element to collection
     *
     * @param {string} key
     * @param element
     *
     * @return {ICollections}
     */
    public addTo(key: string, element: any): ICollections {
        const strategy = this.getStrategy(key);
        const storage = this.getStorage(key);

        this.replaceAllIn(key, strategy.add(storage, element));

        return this;
    }

    /**
     * Remove element from collection
     *
     * @param {string} key
     * @param element
     *
     * @return {ICollections}
     */
    public removeFrom(key: string, element: any): ICollections {
        const strategy = this.getStrategy(key);
        const storage = this.getStorage(key);

        this.replaceAllIn(key, strategy.remove(storage, element));

        return this;
    }

    /**
     * Is element exist in collection
     *
     * @param {string} key
     * @param element
     *
     * @return {boolean}
     */
    public hasIn(key: string, element: any): boolean {
        const strategy = this.getStrategy(key);
        const storage = this.getStorage(key);

        return strategy.has(storage, element);
    }

    /**
     * Clear collection
     *
     * @param {string} key
     *
     * @return {ICollections}
     */
    public clear(key: string): ICollections {
        this.replaceAllIn(key, []);

        return this;
    }

    /**
     * Get all elements from collection
     *
     * @param {string} key
     *
     * @return {any[]}
     */
    public getAllFrom(key: string): any[] {
        return this.getStorage(key);
    }

    /**
     * Is collection is empty
     *
     * @param {string} key
     *
     * @return {boolean}
     */
    public isEmpty(key: string): boolean {
        return !this.getStorage(key).length;
    }

    /**
     * Get all keys of collections
     *
     * @return {string[]}
     */
    public keys(): string[] {
        return Object.keys(this.storages);
    }

    /**
     * Add collection strategy
     *
     * @param {string} key
     * @param {IStrategy} strategy
     * @return {ICollections}
     */
    public addStrategy(key: string, strategy: IStrategy): ICollections {
        if (this.strategies[key]) {
            throw new Error(`${key} strategy already exist`);
        }

        this.strategies[key] = strategy;
        this.storages[key] = [];

        return this;
    }

    /**
     * Remove collection strategy
     *
     * @param {string} key
     * @return {ICollections}
     */
    public removeStrategy(key: string): ICollections {
        if (!this.strategies[key]) {
            throw new Error(`${key} strategy not found`);
        }

        this.strategies[key] = null;
        this.storages[key] = null;

        return this;
    }

    /**
     * Get collection by key
     *
     * @param {string} key
     *
     * @return {any[]}
     */
    protected getStorage(key: string): any[] {
        return this.storages[key] || [];
    }

    /**
     * Get strategy for collection by key
     *
     * @param {string} key
     *
     * @return {IStrategy}
     */
    protected getStrategy(key: string): IStrategy {
        if (!this.strategies[key]) {
            throw new Error(`${key} strategy not found`);
        }

        return this.strategies[key];
    }
}
