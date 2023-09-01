import { NominatimJS } from 'nominatim-search';
import { INominatimResult } from 'nominatim-search/dist';
import { IGeocodeResult, IGeocoderStrategy } from '../interface/geocoder';
import { Coords, tCoords } from '../../coords';

export class LeafletGeocoderStrategy implements IGeocoderStrategy {
    public whatAt(coords: tCoords): Promise<IGeocodeResult> {
        return new Promise((
            resolve: (result: IGeocodeResult) => void,
            reject: (message?: string) => void,
        ) => {
            const point = new Coords(coords);

            NominatimJS.reverse({
                lat: point.lat,
                lon: point.lng,
            }).then((res: INominatimResult) => {
                if (!res) {
                    resolve(null);
                    return;
                }

                resolve({
                    address: res.display_name,
                    coords: new Coords(res.lat, res.lon),
                });
            }).catch((error?: string) => {
                reject(error);
            });
        });
    }

    public whereIs(address: string, coords?: tCoords): Promise<IGeocodeResult> {
        return new Promise((
            resolve: (result: IGeocodeResult) => void,
            reject: (message?: string) => void,
        ) => {
            NominatimJS.search({
                q: address,
                addressdetails: 1,
            }).then((res: INominatimResult[]) => {
                const elements: IGeocodeResult[]  = [];

                res.forEach((obj: INominatimResult) => {
                    // В описании файла в модуле lng в документации к nominatim lon
                    elements.push({
                        address: obj.display_name,
                        coords: new Coords(obj.lat, obj.lon),
                    });
                });

                resolve(elements[0] || null);
            }).catch((error?: string) => {
                reject(error);
            });
        });
    }
}
