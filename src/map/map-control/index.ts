import { MapControlConstructor } from './control-constructor';
import { IGeoStrategy } from '../drivers/interface/index';

export class MapControlController {
    protected strategy: IGeoStrategy;

    constructor(strategy?: IGeoStrategy) {
        this.strategy = strategy || null;
    }

    public get element() {
        return new MapControlConstructor(this.getStrategy());
    }

    /**
     * Get the current work strategy.
     *
     * @return {IGeoStrategy}
     */
    protected getStrategy(): IGeoStrategy {
        return this.strategy;
    }
}
