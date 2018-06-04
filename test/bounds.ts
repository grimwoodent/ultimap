import { expect } from 'chai';
import 'mocha';
import { Coords } from './../src/map/coords';
import { Bounds } from './../src/map/bounds';

describe('Bounds', () => {
    it('should be created by 2 arrays of numbers', () => {
        expect(() => {
            (new Bounds([0, 0], [1, 1]));
        }).to.not.throw();
    });

    it('should be created by array of numbers', () => {
        expect(() => {
            (new Bounds([[0, 0], [1, 1]]));
        }).to.not.throw();
    });

    it('should be created by coords', () => {
        expect(() => {
            (new Bounds(new Coords([0, 0]), new Coords([1, 1])));
        }).to.not.throw();
    });

    it('should be converted to array', () => {
        const bounds = (new Bounds(new Coords([0, 1]), new Coords([2, 3])));

        expect(bounds.toArray()).to.be.deep.equals([[0, 1], [2, 3]]);
    });

    it('should not be created by empty', () => {
        expect(() => {
            (new Bounds());
        }).to.throw();
    });
});