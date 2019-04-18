import { Coords, IPoint, tCoords } from './coords';

export interface IBounds {
    toLatLng(): Array<{ lat: number, lng: number }>;
    toArray(): [[number, number], [number, number]];
    toPoint(): IPoint[];
    toRectangle(closed?: boolean): Array<[number, number]>;
    getCenter(): Coords;
}

export class Bounds implements IBounds {
    protected corner1: Coords;
    protected corner2: Coords;

    constructor(corner1: tCoords|[tCoords, tCoords], corner2?: tCoords) {
        if (!corner2 && Array.isArray(corner1)) {
            this.corner1 = new Coords(corner1[0] as tCoords);
            this.corner2 = new Coords(corner1[1] as tCoords);
        } else if (!corner1 || !corner2) {
            throw new Error('Bounds parse corners coords error');
        } else {
            this.corner1 = (corner1 instanceof Coords) ? corner1 : new Coords(corner1 as tCoords);
            this.corner2 = (corner2 instanceof Coords) ? corner2 : new Coords(corner2 as tCoords);
        }
    }

    public toLatLng(): Array<{ lat: number, lng: number }> {
        return [this.corner1.toLatLng(), this.corner2.toLatLng()];
    }

    public toArray(): [[number, number], [number, number]] {
        return [this.corner1.toArray(), this.corner2.toArray()];
    }

    public toPoint(): IPoint[] {
        return [this.corner1.toPoint(), this.corner2.toPoint()];
    }

    /**
     * Get bounds coords lake rectangle
     * @param {boolean} closed
     * @return {Array<[number , number]>}
     */
    public toRectangle(closed: boolean = false): Array<[number, number]> {
        const rectangle = [
            [this.corner1.lat, this.corner1.lng],
            [this.corner2.lat, this.corner1.lng],
            [this.corner2.lat, this.corner2.lng],
            [this.corner1.lat, this.corner2.lng],
        ];

        if (closed) {
            rectangle.push([this.corner1.lat, this.corner1.lng]);
        }

        return rectangle as Array<[number, number]>;
    }

    public getCenter(): Coords {
        return new Coords((this.corner1.lat + this.corner2.lat) / 2, (this.corner1.lng + this.corner2.lng) / 2);
    }
}
