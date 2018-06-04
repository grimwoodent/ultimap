import { expect } from 'chai';
import 'mocha';
import * as Collection from '../dist/map/collection/constructor';
import { geo } from '../index';

describe('Collection', () => {
    describe('Abstract', () => {
        let collections;

        it('should be created', () => {
            expect(() => {
                collections = (new Collection.Constructor({}));
            }).to.not.throw();
        });

        it('should throw on access to empty strategy', () => {
            expect(() => {
                collections.addTo('numbers', 1);
            }).to.throw();
        });

        it('should add new strategy', () => {
            expect(() => {
                collections.addStrategy('numbers', new Collection.Strategy());
            }).to.not.throw();
        });

        it('should add to strategy', () => {
            expect(() => {
                collections.addTo('numbers', 1);
            }).to.not.throw();
        });

        it('should has element after add', () => {
            expect(collections.hasIn('numbers', 1)).to.be.equals(true);
        });

        it('should remove from strategy', () => {
            expect(() => {
                collections.removeFrom('numbers', 1);
            }).to.not.throw();
        });

        it('should has not element after remove', () => {
            expect(collections.hasIn('numbers', 1)).to.be.equals(false);
        });

        it('should be empty', () => {
            expect(collections.isEmpty('numbers')).to.be.equals(true);
        });
    });

    describe('GeoObjects', () => {
        let collections;

        it('should be created', () => {
            expect(() => {
                collections = (new geo.Collections.Constructor({
                    [geo.Collections.Type.Marker]: (new geo.Collections.Strategy.Marker()),
                    [geo.Collections.Type.Polygon]: (new geo.Collections.Strategy.Polygon()),
                }));
            }).to.not.throw();
        });

        describe('Marker', () => {
            const marker = geo.marker.create([0, 0], {
                icon: {
                    src: '@src',
                    offset: [17, 46],
                    size: [34, 46],
                },
            });

            it('should be added', () => {
                expect(() => {
                    collections.addTo(geo.Collections.Type.Marker, marker);
                }).to.not.throw();
                expect(collections.isEmpty(geo.Collections.Type.Marker)).to.be.equals(false);
            });

            it('should be removed', () => {
                expect(() => {
                    collections.removeFrom(geo.Collections.Type.Marker, marker);
                }).to.not.throw();
                expect(collections.isEmpty(geo.Collections.Type.Marker)).to.be.equals(true);
            });
        });
    });
});
