import { ILatLng, tSimpleCoords } from '../coords';

type coordsArrays = tSimpleCoords[] | tSimpleCoords[][] | tSimpleCoords[][][];
type latLngArrays = ILatLng[] | ILatLng[][] | ILatLng[][][];
type simplifed = ILatLng | ILatLng[] | tSimpleCoords | tSimpleCoords[];
type anyCoords = ILatLng | latLngArrays | tSimpleCoords | coordsArrays;

export class UtilsPolygonCoords {
    /**
     * Является ли объект простой координатой в виде массива
     *
     * @param coords
     *
     * @return {boolean}
     */
    public static isSimpleCoords(coords: any): boolean {
        if (!coords || !Array.isArray(coords)) {
            return false;
        }

        const isCoord0 = typeof coords[0] === 'number' || typeof coords[0] === 'string';
        const isCoord1 = typeof coords[1] === 'number' || typeof coords[1] === 'string';

        return isCoord0 && isCoord1;
    }

    /**
     * Является ли объект простой координатой
     *
     * @param coords
     *
     * @return {boolean}
     */
    public static isLatLng(coords: any): boolean {
        if (!coords || typeof coords !== 'object') {
            return false;
        }

        return coords.hasOwnProperty('lat') && coords.hasOwnProperty('lng');
    }

    /**
     * Привести в формат объекта
     *
     * @param {tSimpleCoords | coordsArrays} coords
     *
     * @return {ILatLng | latLngArrays}
     */
    public static toLatLng(coords: anyCoords): ILatLng | latLngArrays {
        if (this.isLatLng(coords as any)) {
            return coords as any;
        }

        if (!coords || !Array.isArray(coords)) {
            return null;
        }

        if (this.isSimpleCoords(coords)) {
            return {
                lat: coords[0],
                lng: coords[1],
            } as ILatLng;
        }
        return (coords as tSimpleCoords[])
            .map((coord) => this.toLatLng(coord))
            .filter((coord) => !!coord) as latLngArrays;
    }

    /**
     * Приветси координаты в формат чисел
     *
     * @param {ILatLng | latLngArrays} coords
     *
     * @return {tSimpleCoords | coordsArrays}
     */
    public static toNumbers(coords: anyCoords): tSimpleCoords | coordsArrays {
        if (this.isSimpleCoords(coords as any)) {
            return coords as any;
        }

        if (!coords) {
            return null;
        }

        if (this.isLatLng(coords)) {
            return [(coords as ILatLng).lat, (coords as ILatLng).lng] as tSimpleCoords;
        }

        if (Array.isArray(coords)) {
            return (coords as ILatLng[])
                .map((coord) => this.toNumbers(coord))
                .filter((coord) => !!coord) as coordsArrays;
        }

        return null;
    }

    /**
     * Сравнить двое координат
     *
     * @param {tSimpleCoords | ILatLng} coords1
     * @param {tSimpleCoords | ILatLng} coords2
     *
     * @return {boolean}
     */
    public static equals(coords1: tSimpleCoords | ILatLng, coords2: tSimpleCoords | ILatLng): boolean {
        const c1 = this.toLatLng(coords1) as ILatLng;
        const c2 = this.toLatLng(coords2) as ILatLng;

        if (!c1 || !c2) {
            return false;
        }

        return c1.lat === c2.lat && c1.lng === c2.lng;
    }

    /**
     * Привести координаты к массиву простых координат
     *
     * @param {ILatLng | latLngArrays | tSimpleCoords | coordsArrays} coords
     *
     * @return {simplifed}
     */
    public static simplify(coords: anyCoords): simplifed {
        if (!coords) {
            return [];
        }

        if (this.isSimpleCoords(coords) || this.isLatLng(coords)) {
            return [coords] as any;
        }

        if (!Array.isArray(coords)) {
            return [];
        }

        return (coords as any[]).reduce((p: any, c: any) => {
            const r = this.simplify(c);

            if (!r) {
                return p;
            }

            return p.concat(r);
        }, []);
    }

    /**
     * Количество точек
     * @param {ILatLng | latLngArrays | tSimpleCoords | coordsArrays} coords
     * @return {number}
     */
    public static count(coords: anyCoords): number {
        if (this.isSimpleCoords(coords)) {
            return 1;
        }

        if (this.isLatLng(coords)) {
            return 1;
        }

        if (!coords || !Array.isArray(coords)) {
            return 0;
        }

        return (coords as any[]).reduce((p: any, c: any) => {
            return p + this.count(c);
        }, 0) as number;
    }

    /**
     * Получить глубину вложенности координат
     *
     * @param {ILatLng | latLngArrays | tSimpleCoords | coordsArrays} coords
     * @param {number} deep
     *
     * @return {number}
     */
    public static deep(coords: anyCoords, deep = 0): number {
        if (this.isSimpleCoords(coords)) {
            return 1;
        }

        if (this.isLatLng(coords)) {
            return 1;
        }

        if (!coords || !Array.isArray(coords)) {
            return 0;
        }

        return (coords as any[]).reduce((p: any, c: any) => {
            const d = this.deep(c, deep + 1);

            return p > (d + 1) ? p : (d + 1);
        }, 0) as number;
    }

    public static normalize(value: anyCoords): tSimpleCoords[][] {
        const coords = this.toNumbers(value as any);
        const deep = this.deep(coords);
        let normalized;

        switch (deep) {
            case 0: normalized = [[[]]]; break;
            case 1: normalized = [[coords]]; break;
            case 2: normalized = [coords]; break;
            case 3: normalized = coords; break;
            default:
                throw new Error('Points is too deep');
        }

        (normalized as any[]).forEach((arr) => {
            const e = arr[0];
            const last = arr[arr.length - 1];

            if (this.isSimpleCoords(e) || this.isLatLng(e)) {
                if (arr.length > 1) {
                    if (!this.equals(e, last)) {
                        arr.push(e);
                    }
                } else {
                    arr.push(e);
                }
            }
        });

        return normalized as any;
    }
}
