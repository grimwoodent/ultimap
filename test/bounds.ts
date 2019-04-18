import { expect } from 'chai';
import 'mocha';
import { Coords } from '../dist';
import { Bounds } from '../dist';

describe('Bounds', () => {
    describe('Create', () => {
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

        it('should not be created by empty', () => {
            expect(() => {
                (new Bounds());
            }).to.throw();
        });
    });

    describe('Convert', () => {
        it('should be converted to array', () => {
            const bounds = (new Bounds(new Coords([0, 1]), new Coords([2, 3])));

            expect(bounds.toArray()).to.be.deep.equals([[0, 1], [2, 3]]);
        });

        it('should be converted to latlng', () => {
            const bounds = (new Bounds(new Coords([0, 1]), new Coords([2, 3])));

            expect(bounds.toLatLng()).to.be.deep.equals([{ lat: 0, lng: 1 }, { lat: 2, lng: 3 }]);
        });

        it('should be converted to point', () => {
            const bounds = (new Bounds(new Coords([0, 1]), new Coords([2, 3])));

            expect(bounds.toPoint()).to.be.deep.equals([{ x: 0, y: 1 }, { x: 2, y: 3 }]);
        });

        it('should be converted to rectangle', () => {
            const bounds = (new Bounds(new Coords([0, 1]), new Coords([2, 3])));

            expect(bounds.toRectangle()).to.be.deep.equals([
                [0, 1],
                [2, 1],
                [2, 3],
                [0, 3],
            ]);
            expect(bounds.toRectangle(true)).to.be.deep.equals([
                [0, 1],
                [2, 1],
                [2, 3],
                [0, 3],
                [0, 1],
            ]);
        });
    });

    describe('Center', () => {
        it('should return center', () => {
            const bounds = (new Bounds(new Coords([0, 1]), new Coords([2, 3])));

            expect(bounds.getCenter().toArray()).to.be.deep.equals([1, 2]);
        });
    });
});
