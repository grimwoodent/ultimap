import { Coords, tCoords } from '../../coords';

// @TODO Добавить подробный адрес разбитый на составляющие
export interface IGeocodeResult {
    address: string;
    coords: Coords;
}

export interface IGeocoderStrategy {
    whatAt(coords: tCoords): Promise<IGeocodeResult>;
    whereIs(address: string, coords?: tCoords): Promise<IGeocodeResult>;
}
