const concavehull = require('concaveman');
const convexhull = require('quick-hull-2d');
import { tSimpleCoords } from './coords';
import { Bounds } from './bounds';
import { UtilsPolygonCoords } from './utils/polygon-coords';

export type tPolygonCoords = tSimpleCoords[];

export class PolygonCoords {
    public static createByConcaveHull(points: tPolygonCoords) {
        return new (this as any)(concavehull(points));
    }

    public static createByConvexHull(points: tPolygonCoords) {
        return new (this as any)(convexhull(points));
    }


    public points: tPolygonCoords = null;

    constructor(points: tPolygonCoords) {
        this.points = UtilsPolygonCoords.toNumbers(points as any) as tPolygonCoords;
    }

    /**
     * Привести в массив
     *
     * @param {boolean} normalize Нормализировать объект к виду вложенности 3
     *
     * @return {tPolygonCoords}
     */
    public toArray(normalize: boolean = false): tPolygonCoords {
        if (normalize) {
            return UtilsPolygonCoords.normalize(this.points) as any;
        }

        return this.points as tPolygonCoords;
    }

    public toJson(normalize: boolean = false): string {
        if (!this.getCount()) {
            console.error('Empty polygon coords');
            if (normalize) {
                return '[[[]]]';
            }

            return JSON.stringify(this.points || []);
        }

        return JSON.stringify(this.toArray(normalize));
    }

    public getCount(): number {
        return UtilsPolygonCoords.count(this.points);
    }

    public getBounds(): Bounds {
        const points: {
            left: number,
            right: number,
            bottom: number,
            top: number,
        } = {
            left: null,
            right: null,
            bottom: null,
            top: null,
        };

        (UtilsPolygonCoords.simplify(this.points) as tSimpleCoords[]).forEach((point: tSimpleCoords) => {
            const coords = (Array.isArray(point[0]) ? point[0] : point) as tSimpleCoords;
            const lat = coords[0] as number;
            const lng = coords[1] as number;

            points.left = ((points.left === null) || (lat < points.left))
                ? lat
                : points.left;
            points.right = ((points.right === null) || (lat > points.right))
                ? lat
                : points.right;

            points.bottom = ((points.bottom === null) || (lng < points.bottom))
                ? lng
                : points.bottom;
            points.top = ((points.top === null) || (lng > points.top))
                ? lng
                : points.top;
        });

        return new Bounds([points.left, points.top], [points.right, points.bottom]);
    }
}
