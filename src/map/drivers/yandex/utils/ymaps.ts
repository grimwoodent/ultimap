export type YMarker = any;

// @TODO ymaps @types interface
export interface IYMaps {
    ready: (resolve: () => void, reject: () => void) => void;
}

export class Api {
    public static load() {
        const script = document.createElement('script');

        script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';

        document.head.appendChild(script);
    }

    public static get ymaps() {
        return (window as any).ymaps as any;
    }
}
