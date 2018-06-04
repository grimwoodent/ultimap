import { Bounds } from './bounds';

export interface ILatLng {
    lat: number | string;
    lng: number | string;
}

export interface IPoint {
    x: number;
    y: number;
}

export type tSimpleCoords = [number, number];

export type tCoord = number | string;

export type tCoords = [number | string, number | string] | ILatLng;

export class Coords {
    public lat: number = null;
    public lng: number = null;

    constructor(lat: tCoords|tCoord, lng?: tCoord) {
        if (Array.isArray(lat)) {
            this.lat = parseFloat(lat[0] as string) as number;
            this.lng = parseFloat(lat[1] as string) as number;
        } else if (typeof(lat) === 'object') {
            this.lat = parseFloat(lat.lat as string) as number;
            this.lng = parseFloat(lat.lng as string) as number;
        } else {
            this.lat = parseFloat(lat as string) as number;
            this.lng = parseFloat(lng as string) as number;
        }

        if (isNaN(this.lat) || (typeof(this.lat) !== 'number') || isNaN(this.lng) || (typeof(this.lng) !== 'number')) {
            throw new Error('Coords parse error');
        }
    }

    public toArray(): tSimpleCoords {
        return [this.lat, this.lng];
    }

    public toLatLng(): { lat: number, lng: number } {
        return {
            lat: this.lat,
            lng: this.lng,
        };
    }

    public toPoint(): IPoint {
        return {
            x: this.lat,
            y: this.lng,
        };
    }

    public getBounds(): Bounds {
        const center = this.toArray();

        return new Bounds(center, center);
    }
}
