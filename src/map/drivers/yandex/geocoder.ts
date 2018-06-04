import { ymaps } from './utils/ymaps';
import { IGeocodeResult, IGeocoderStrategy } from '../interface/geocoder';
import { Coords, tCoords } from '../../coords';

export class YandexGeocoderStrategy implements IGeocoderStrategy {
    public whatAt(coords: tCoords): Promise<IGeocodeResult> {
        return new Promise((
            resolve: (result: IGeocodeResult) => void,
            reject: (message?: string) => void,
        ) => {
            if (!ymaps) {
                reject('Yandex maps script not found');
                return;
            }

            // @TODO implements method
            reject('Method not implemented');
        });
    }

    public whereIs(address: string, coords?: tCoords): Promise<IGeocodeResult> {
        return new Promise((
            resolve: (result: IGeocodeResult) => void,
            reject: (message?: string) => void,
        ) => {
            if (!ymaps) {
                reject('Yandex maps script not found');
                return;
            }

            const params: {
                boundedBy?: [[number, number], [number, number]],
            } = {};

            if (coords) {
                const center = new Coords(coords);

                params.boundedBy = center.getBounds().toArray();
            }

            ymaps.geocode(address, params)
                .then((res: any) => {
                    if (!res || !res.geoObjects || !res.geoObjects.each) {
                        reject('Empty geocoder response');
                        return;
                    }

                    const elements: IGeocodeResult[]  = [];

                    res.geoObjects.each((obj: any) => {
                        elements.push({
                            address: obj.properties.get('name'),
                            coords: new Coords(obj.geometry.getCoordinates()),
                        });
                    });

                    resolve(elements[0] || null);
                }, () => {
                    reject();
                });
        });
    }
}
