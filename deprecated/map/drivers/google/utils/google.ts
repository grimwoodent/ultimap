export class Api {
    /**
     * Doesnt used
     */
    public static load() {
        const script = document.createElement('script');

        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js';

        document.head.appendChild(script);
    }

    public static get google() {
        return (window as any).google as any;
    }
}