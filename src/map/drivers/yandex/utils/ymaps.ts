// @TODO ymaps @types interface
export interface IYMaps {
    ready: (resolve: () => void, reject: () => void) => void;
}

export const ymaps = (window as any).ymaps as any;
