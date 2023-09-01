export type YMarker = any;

export type YPolygon = any;

export type YMapEvent = any;

// @TODO ymaps @types interface
export interface IYMaps {
    ready: (resolve: () => void, reject: () => void) => void;
}

export class Api {
    /**
     * Doesnt used
     */
    public static load() {
        const script = document.createElement('script');

        script.type = 'text/javascript';
        script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';

        document.head.appendChild(script);
    }

    public static get ymaps() {
        return (window as any).ymaps as any;
    }
}
