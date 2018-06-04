import { Coords, IPoint, tCoords } from './coords';

export class Bounds {
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

    public toArray(): [[number, number], [number, number]] {
        return [this.corner1.toArray(), this.corner2.toArray()];
    }

    public toPoint(): IPoint[] {
        return [this.corner1.toPoint(), this.corner2.toPoint()];
    }
}
