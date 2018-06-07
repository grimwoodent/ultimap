import { expect } from 'chai';
import 'mocha';
import { Coords } from '../dist';

describe('Coords', () => {
    it('should be created by numbers', () => {
        const coords = new Coords(1, 2);

        expect(coords.lat).to.be.equals(1);
        expect(coords.lng).to.be.equals(2);
    });

    it('should be created by floats', () => {
        const coords = new Coords(1.1, 1.2);

        expect(coords.lat).to.be.equals(1.1);
        expect(coords.lng).to.be.equals(1.2);
    });

    it('should be created by strings', () => {
        const coords = new Coords('1', '2');

        expect(coords.lat).to.be.equals(1);
        expect(coords.lng).to.be.equals(2);
    });

    it('should be created by object', () => {
        const coords = new Coords({lat: 1, lng: 2});

        expect(coords.lat).to.be.equals(1);
        expect(coords.lng).to.be.equals(2);
    });

    it('should be created by array', () => {
        const coords = new Coords([1, 2]);

        expect(coords.lat).to.be.equals(1);
        expect(coords.lng).to.be.equals(2);
    });

    it('should not be created by empty', () => {
        expect(() => {
            (new Coords());
        }).to.throw();
    });

    it('should not be created by boolean', () => {
        expect(() => {
            (new Coords(false, false));
            (new Coords(false, true));
        }).to.throw();
    });

    it('should not fall by zero coords', () => {
        expect(() => {
            (new Coords(0, 0));
        }).to.not.throw();
    });

    it('should be converted to array', () => {
        const coords = new Coords(1, 2);

        expect(coords.toArray()).to.be.deep.equals([1, 2]);
    });
});
