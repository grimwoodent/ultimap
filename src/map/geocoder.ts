import { IGeoStrategy } from './drivers/interface/index';
import { IGeocodeResult, IGeocoderStrategy } from './drivers/interface/geocoder';
import { tCoords } from './coords';

interface IGeocoder {
    whatAt(coords: any): Promise<any>;
    whereIs(address: string, coords?: any): Promise<any>;
}

export class Geocoder {
    protected strategy: IGeoStrategy;

    constructor(strategy: IGeoStrategy) {
        this.strategy = strategy;
    }

    /**
     * Какие объекты находятся рядом с точкой
     * @param {tCoords} coords
     * @return {Promise<IGeocodeResult>}
     */
    public whatAt(coords: tCoords): Promise<IGeocodeResult> {
        return this.getStrategy().whatAt(coords);
    }

    /**
     * Где находится этот адресс
     * @param {string} address
     * @param {tCoords} coords
     * @return {Promise<IGeocodeResult>}
     */
    public whereIs(address: string, coords?: tCoords): Promise<IGeocodeResult> {
        return this.getStrategy().whereIs(address, coords);
    }

    /**
     * Стратегия работы с геообъектом
     * @return {IGeocoderStrategy}
     */
    protected getStrategy(): IGeocoderStrategy {
        return this.strategy.geocoder;
    }
}
