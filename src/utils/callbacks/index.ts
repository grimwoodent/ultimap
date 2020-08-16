type EventHandlerFn = (...args: any[]) => any;
type EventHandlerFnSet = EventHandlerFn[];

interface IEventHandlerSetProps {
    [key: string]: EventHandlerFn | EventHandlerFnSet;
}

interface IEventHandlerSet {
    [key: string]: EventHandlerFnSet;
}

export class Callbacks {
    protected events: IEventHandlerSet = {};

    /**
     * @param {Object} events
     */
    constructor(events: IEventHandlerSetProps) {
        this.set(events);
    }

    /**
     * Установить события
     *
     * @param {Object} events
     *
     * @return {Callbacks} self
     */
    public set(events: IEventHandlerSetProps): Callbacks {
        Object.keys(events || {}).forEach((key) => {
            if (!this.events[key]) {
                this.events[key] = [];
            }

            const newEvents: EventHandlerFnSet = Array.isArray(events[key])
                ? events[key] as EventHandlerFnSet
                : [events[key]] as EventHandlerFnSet;

            newEvents.forEach((event) => {
                if (typeof(event) === 'function') {
                    this.events[key].push(event);
                }
            });
        });

        return this;
    }

    /**
     * Получить функцию по ключу
     *
     * @param {String} key
     *
     * @return {EventHandlerFn} callback
     */
    public get(key: string): EventHandlerFn | EventHandlerFnSet {
        if (!this.has(key)) {
            return null;
        }

        const result: EventHandlerFnSet = [].concat(this.events[key]);

        return result.length > 1
            ? result
            : result[0];
    }

    /**
     * удалить событие
     * @param {IEventHandlerSetProps} events
     * @return {Callbacks}
     */
    public remove(events: IEventHandlerSetProps): Callbacks {
        Object.keys(events || {}).forEach((key) => {
            if (!this.has(key)) {
                return;
            }

            const remoedEvents: EventHandlerFnSet = Array.isArray(events[key])
                ? events[key] as EventHandlerFnSet
                : [events[key]] as EventHandlerFnSet;

            while (remoedEvents.length) {
                const event = remoedEvents.pop();
                const idx = this.events[key].findIndex((fn) => event === fn);

                if (!!~idx) {
                    this.events[key].splice(idx, 1);
                }
            }
        });

        return this;
    }

    /**
     * Возвращает установлена ли функция с таким ключом
     *
     * @param {String} key
     *
     * @return {Boolean}
     */
    public has(key: string): boolean {
        if (typeof(key) !== 'string') {
            return false;
        }

        return key && this.events[key] && !!this.events[key].length;
    }

    /**
     * Вызвать функцию по ключу с аргументами
     *
     * @param {String} key
     *
     * @return {any} result
     */
    public trigger(key: string, ...args: any[]): any {
        if (!this.has(key)) {
            return undefined;
        }

        const result = this.events[key].map((event) => event.apply(undefined, args));

        return result.length > 1
            ? result
            : result.pop();
    }

    /**
     * Возвращает установлена ли функция с таким ключом
     *
     * @deprecated
     *
     * @param {String} key
     *
     * @return {Boolean}
     */
    public isSet(key: string): boolean {
        return this.has(key);
    }
}
