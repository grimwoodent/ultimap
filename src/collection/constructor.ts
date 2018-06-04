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
     * Заменить все элементы на новые
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
     * Добавить элемент в коллекцию
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
     * Удалить из коллекции
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
     * Есть ли такой элемента в коллекции
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
     * Очистить коллекцию
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
     * Получить все элементы из хранилища
     *
     * @param {string} key
     *
     * @return {any[]}
     */
    public getAllFrom(key: string): any[] {
        return this.getStorage(key);
    }

    /**
     * пустое ли хранилище
     *
     * @param {string} key
     *
     * @return {boolean}
     */
    public isEmpty(key: string): boolean {
        return !this.getStorage(key).length;
    }

    /**
     * Получить все ключи всех возможных для работы хранилищ
     *
     * @return {string[]}
     */
    public keys(): string[] {
        return Object.keys(this.storages);
    }

    public addStrategy(key: string, strategy: IStrategy): ICollections {
        if (this.strategies[key]) {
            throw new Error(`${key} strategy already exist`);
        }

        this.strategies[key] = strategy;
        this.storages[key] = [];

        return this;
    }

    public removeStrategy(key: string): ICollections {
        if (!this.strategies[key]) {
            throw new Error(`${key} strategy not found`);
        }

        this.strategies[key] = null;
        this.storages[key] = null;

        return this;
    }

    /**
     * Получить текущие элементы из хронилища для типа
     *
     * @param {string} key
     *
     * @return {any[]}
     */
    protected getStorage(key: string): any[] {
        return this.storages[key] || [];
    }

    /**
     * Получить стратегию для работы с этим типом
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
