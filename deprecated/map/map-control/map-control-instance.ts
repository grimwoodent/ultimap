import { TControlConstructor } from '../drivers/interface/map-control';

export interface IMapControl {
    getInstance(): any;
}

export class MapControl implements IMapControl {
    protected instance: any;

    constructor(instance: any, baseConstructor?: TControlConstructor, ...args: any[]) {
        if (baseConstructor) {
            (baseConstructor as any).call(this, this, ...args);
        }

        this.instance = instance;
    }

    public getInstance(): any {
        return this.instance;
    }
}
