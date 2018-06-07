import { expect, assert } from 'chai';
import 'mocha';
import { JSDOM } from 'jsdom';
import { geo } from '../dist';

describe('Map', () => {
    describe('element', () => {
        let map;

        it('should be created', () => {
            expect(() => {
                map = geo.map.create(JSDOM.fragment('<div></div>').firstChild, {
                    center: [0, 0],
                    zoom: 13,
                });
            }).to.not.throw();
        });

        it('should be load', (done) => {
            map.load().then(() => {
                assert.isTrue(map.hasInstance());

                done();
            }, (message) => {
                done(message);
            });
        });
    });

    describe('zoom', () => {
        it('should be set or get without instance', () => {
            const map = geo.map.create(JSDOM.fragment('<div></div>').firstChild, {
                center: [55.7500, 37.6300],
                zoom: 1,
            });

            expect(map.getZoom(false)).to.be.equals(1);
            expect(() => {
                map.setZoom(3);
            }).to.not.throw();
            expect(map.getZoom(false)).to.be.equals(3);
            expect(() => {
                map.getZoom();
            }).to.throw();
        });

        it('should be set or get with instance', (done) => {
            const map = geo.map.create(JSDOM.fragment('<div></div>').firstChild, {
                center: [55.7500, 37.6300],
                zoom: 1,
            });

            map.load().then(() => {
                map.setZoom(4);

                assert.equal(map.getZoom(), 4);

                done();
            }, (message) => {
                done(message);
            });
        });
    });

    describe('center', () => {
        it('should be set or get without instance', () => {
            const map = geo.map.create(JSDOM.fragment('<div></div>').firstChild, {
                center: [0, 0],
                zoom: 1,
            });

            expect(() => {
                map.setCenter([1, 2]);
            }).to.not.throw();
            expect(map.getCenter(false).toArray()).to.be.deep.equals([1, 2]);
            expect(() => {
                map.getCenter();
            }).to.throw();
        });

        it('should be set or get with instance', (done) => {
            const map = geo.map.create(JSDOM.fragment('<div></div>').firstChild, {
                center: [0, 0],
                zoom: 1,
            });

            map.load().then((map) => {
                map.setCenter([1, 2]);

                assert.deepEqual(map.getCenter().toArray(), [1, 2]);

                done();
            }, (message) => {
                done(message);
            });
        });

        it('should be set by bounds', (done) => {
            const map = geo.map.create(JSDOM.fragment('<div></div>').firstChild, {
                bounds: [[0, 0], [4, 4]],
                zoom: 1,
            });

            map.load().then((map) => {
                assert.deepEqual(map.getCenter().toArray(), [2, 2]);
                done();
            }, (message) => {
                done(message);
            });
        });
    });
});
