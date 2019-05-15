import { expect, assert } from 'chai';
import 'mocha';
import { JSDOM } from 'jsdom';
import { geo, Coords } from '../dist';
import { Strategy } from '../dist/strategy/leaflet';

describe('Polygon', () => {
    const ugeo = geo.byStrategy(new Strategy.Leaflet());
    const map = ugeo.map.create(JSDOM.fragment('<div></div>').firstChild, {
        center: [0, 0],
        zoom: 13,
    });
    const coords = [[
        [57.79968313324691,40.94109504772947],
        [57.77263617196502,40.87964027478026],
        [57.740061158662854,40.91328590466307],
        [57.74354947014791,41.01868599011228],
        [57.798949924647765,41.031903916137665],
        [57.79968313324691,40.94109504772947],
    ]];

    describe('element', () => {
        let polygon;

        it('should be created', () => {
            expect(() => {
                polygon = ugeo.polygon.create(coords, {});
            }).to.not.throw();
        });

        it('should be created by Coords', () => {
            expect(() => {
                ugeo.polygon.create(coords.map((coord) => new Coords(coord)), {});
            }).to.not.throw();
        });

        // it('should be placed to map', (done) => {
        //     map.load().then(() => {
        //         polygon.addTo(map);
        //
        //         assert.isTrue(polygon.onMap());
        //
        //         done();
        //     }).catch((error) => {
        //         done(error);
        //     });
        // });
    });

    describe('coords', () => {
        describe('should be converted to Array', () => {
            describe('simple', () => {
                const tests = [
                    { coords: [], result: [] },

                    { coords: [1, 2], result: [1, 2] },
                    { coords: [[1, 2]], result: [[1, 2]] },
                    { coords: [[[1, 2]]], result: [[[1, 2]]] },

                    { coords: { lat: 1, lng: 2 }, result: [1, 2] },
                    { coords: [{ lat: 1, lng: 2 }], result: [[1, 2]] },
                    { coords: [[{ lat: 1, lng: 2 }]], result: [[[1, 2]]] },
                ];

                tests.forEach((test, i) => {
                    it(`Test №${i + 1}`, () => {
                        const coords = ugeo.polygon.create(test.coords, {}).getCoords(false);

                        expect((coords.toArray())).to.be.deep.equals(test.result);
                    });
                });
            });

            describe('normalize', () => {
                const tests = [
                    { coords: [], result: [[[]]] },

                    { coords: [1, 2], result: [[[1, 2], [1, 2]]] },
                    { coords: [[1, 2]], result: [[[1, 2], [1, 2]]] },
                    { coords: [[[1, 2]]], result: [[[1, 2], [1, 2]]] },
                ];

                tests.forEach((test, i) => {
                    it(`Test №${i + 1}`, () => {
                        const coords = ugeo.polygon.create(test.coords, {}).getCoords(false);

                        expect((coords.toNormalizeArray())).to.be.deep.equals(test.result);
                    });
                });
            });
        });
    });

    describe('preset', () => {
        it('should be added', () => {
            expect(() => {
                ugeo.preset.polygon
                    .add('defaults', {
                        style: {
                            fillColor: '#df362a',
                            fillOpacity: 0.33,
                            strokeColor: '#df362a',
                            strokeOpacity: 0.5,
                            strokeWidth: 2,
                        },
                    });
            }).to.not.throw();
        });

        it('should be get', () => {
            const preset = ugeo.preset.polygon.get('defaults');

            assert.isNotEmpty(preset);
        });

        it('should be set to polygon', () => {
            expect(() => {
                const polygon = ugeo.polygon.create(coords, {
                    preset: 'defaults',
                });
            }).to.not.throw();

            // Добавить тест на загрузку карты после решения проблемы с запуском тестов для полигона
        });
    });

    describe('clone', () => {
        it('should be cloned', () => {
            const presetName = 'defaults';
            const preset = ugeo.preset.polygon.get(presetName);
            const polygon = ugeo.polygon.create(coords, {
                preset: presetName,
            });
            const clone = polygon.clone();

            expect(clone).to.be.not.equal(null);
            expect(clone.getCoords(false).toArray()).to.be.deep.equal(coords);
            expect(clone.props.preset).to.be.deep.equal(presetName);
        });
    });
});
