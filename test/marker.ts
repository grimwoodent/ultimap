import { expect, assert } from 'chai';
import 'mocha';
import { JSDOM } from 'jsdom';
import { geo } from '../index';

describe('Marker', () => {
    const map = geo.map.create(JSDOM.fragment('<div></div>').firstChild, {
        center: [0, 0],
        zoom: 13,
    });
    const icon = {
        src: '@src',
        offset: [17, 46],
        size: [34, 46],
    };

    describe('element', () => {
        let marker;

        it('should be created', () => {
            expect(() => {
                marker = geo.marker.create([0, 0], { icon });
            }).to.not.throw();
            expect(marker.getCoords(false).toArray()).to.be.deep.equal([0, 0]);
            expect(marker.props.icon).to.be.deep.equal(icon);
        });

        it('should be placed to map', (done) => {
            map.load().then(() => {
                marker.addTo(map);

                assert.isTrue(marker.onMap());

                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('should set data', () => {
            marker.setData({
                house: {
                    id: 1,
                },
            });

            expect(marker.getData()).to.contain.all.keys(['uid', 'house']);
        });
    });

    describe('coords', () => {
        const marker = geo.marker.create([0, 0], { icon });

        it('should be set without instance', () => {
            expect(() => {
                marker.setCoords([1, 2]);
            }).to.not.throw();
            expect(marker.getCoords(false).toArray()).to.be.deep.equal([1, 2]);
            expect(() => {
                marker.getCoords();
            }).to.throw();
        });

        it('should be set with instance', (done) => {
            map.load().then(() => {
                marker.addTo(map);
                marker.setCoords([1, 2]);
                assert.deepEqual(marker.getCoords(false).toArray(), [1, 2]);

                done();
            }).catch((error) => {
                done(error);
            });
        });
    });

    describe('preset', () => {
        it('should be added', () => {
            expect(() => {
                geo.preset.marker
                    .add('defaults', {
                        icon: {
                            src: '@src',
                            offset: [17, 46],
                            size: [34, 46],
                        },
                    })
                    .add('active', {
                        icon: {
                            src: '@src',
                            offset: [17, 46],
                            size: [34, 46],
                        },
                    });
            }).to.not.throw();
        });

        it('should be set to marker', (done) => {
            const marker = geo.marker.create([0, 0], {
                preset: 'defaults',
            });

            map.load().then(() => {
                marker.addTo(map);
                marker.setPreset('active');
                done();
            }).catch((error) => {
                done(error);
            });
        });
    });

    describe('edit', () => {
        it('should be enabled', (done) => {
            const marker = geo.marker.create([0, 0], { icon });

            map.load().then(() => {
                marker.addTo(map);
                marker.setEditable(true);

                done();
            }).catch((error) => {
                done(error);
            });
        });
    });

    describe('clone', () => {
        it('should be cloned', () => {
            const marker = geo.marker.create([0, 0], { icon });
            const clone = marker.clone();

            expect(clone).to.be.not.equal(null);
            expect(clone.getCoords(false).toArray()).to.be.deep.equal([0, 0]);
            expect(clone.props.icon).to.be.deep.equal(icon);
        });
    });
});
