import { expect } from 'chai';
import 'mocha';
import { UtilsPolygonCoords } from '../src/map/utils/polygon-coords';

describe('Utils', () => {
    describe('PolygonCoords', () => {
        describe('should check is simple coords', () => {
            const tests = [
                { coords: null, result: false },
                { coords: [], result: false },
                { coords: [1], result: false },
                { coords: { lat: 1, lng: 2 }, result: false },
                { coords: '[0, 0]', result: false },
                { coords: [1, 2], result: true },
                { coords: [0, 0], result: true },
            ];

            tests.forEach((test, i) => {
                it(`Test №${i + 1}`, () => {
                    expect((UtilsPolygonCoords.isSimpleCoords(test.coords))).to.be.deep.equals(test.result);
                });
            });
        });

        describe('should check is latlng coords', () => {
            const tests = [
                { coords: null, result: false },
                { coords: [], result: false },
                { coords: [1], result: false },
                { coords: '{ lat: 1, lng: 2 }', result: false },
                { coords: '[0, 0]', result: false },
                { coords: [1, 2], result: false },
                { coords: { lat: 1, lng: 2 }, result: true },
                { coords: { lat: 0, lng: 0 }, result: true },
                { coords: { lat: undefined, lng: undefined }, result: true },
            ];

            tests.forEach((test, i) => {
                it(`Test №${i + 1}`, () => {
                    expect((UtilsPolygonCoords.isLatLng(test.coords))).to.be.deep.equals(test.result);
                });
            });
        });

        describe('should check equals', () => {
            const tests = [
                { coords1: null, coords2: null, result: false },
                { coords1: [1, 2], coords2: null, result: false },
                { coords1: null, coords2: [1, 2], result: false },

                { coords1: [1, 2], coords2: [1, 2], result: true },
                { coords1: [1, 2], coords2: [3, 2], result: false },

                { coords1: { lat: 1, lng: 2 }, coords2: { lat: 1, lng: 2 }, result: true },
                { coords1: { lat: 1, lng: 2 }, coords2: { lat: 3, lng: 4 }, result: false },

                { coords1: { lat: 1, lng: 2 }, coords2: [1, 2], result: true },
                { coords1: { lat: 1, lng: 2 }, coords2: [3, 2], result: false },
            ];

            tests.forEach((test, i) => {
                it(`Test №${i + 1}`, () => {
                    expect((UtilsPolygonCoords.equals(test.coords1, test.coords2))).to.be.equals(test.result);
                });
            });
        });

        describe('should be converted to LatLng', () => {
            const tests = [
                { coords: [], result: [] },

                { coords: [1, 2], result: { lat: 1, lng: 2 } },
                { coords: [[1, 2]], result: [{ lat: 1, lng: 2 }] },
                { coords: [[1, 2], [3, 4]], result: [{ lat: 1, lng: 2 }, { lat: 3, lng: 4 }] },
                { coords: [[[1, 2], [3, 4]]], result: [[{ lat: 1, lng: 2 }, { lat: 3, lng: 4 }]] },

                { coords: { lat: 1, lng: 2 }, result: { lat: 1, lng: 2 } },
                { coords: [{ lat: 1, lng: 2 }], result: [{ lat: 1, lng: 2 }] },
            ];

            tests.forEach((test, i) => {
                it(`Test №${i + 1}`, () => {
                    expect((UtilsPolygonCoords.toLatLng(test.coords))).to.be.deep.equals(test.result);
                });
            });
        });

        describe('should be converted to Numbers', () => {
            const tests = [
                { coords: [], result: [] },

                { coords: { lat: 1, lng: 2 }, result: [1, 2] },
                { coords: [{ lat: 1, lng: 2 }], result: [[1, 2]] },
                { coords: [{ lat: 1, lng: 2 }, { lat: 3, lng: 4 }], result: [[1, 2], [3, 4]] },
                { coords: [[{ lat: 1, lng: 2 }, { lat: 3, lng: 4 }]], result: [[[1, 2], [3, 4]]] },

                { coords: [1, 2], result: [1, 2] },
                { coords: [[1, 2]], result: [[1, 2]] },
            ];

            tests.forEach((test, i) => {
                it(`Test №${i + 1}`, () => {
                    expect((UtilsPolygonCoords.toNumbers(test.coords))).to.be.deep.equals(test.result);
                });
            });
        });

        describe('should be simplify', () => {
            const tests = [
                { coords: null, result: [] },
                { coords: [], result: [] },
                { coords: { lat: 1, lng: 2 }, result: [{ lat: 1, lng: 2 }] },
                { coords: [1, 2], result: [[1, 2]] },
                { coords: [[1, 2]], result: [[1, 2]] },
                { coords: [[1, 2], [3, 4]], result: [[1, 2], [3, 4]] },
                { coords: [[[1, 2]]], result: [[1, 2]] },
                { coords: [[[[1, 2]]]], result: [[1, 2]] },
            ];

            tests.forEach((test, i) => {
                it(`Test №${i + 1}`, () => {
                    expect((UtilsPolygonCoords.simplify(test.coords))).to.be.deep.equals(test.result);
                });
            });
        });

        describe('should be counted', () => {
            const tests = [
                { coords: [], result: 0 },
                { coords: { lat: 1, lng: 2 }, result: 1 },
                { coords: [{ lat: 1, lng: 2 }], result: 1 },
                { coords: [{ lat: 1, lng: 2 }, { lat: 3, lng: 4 }], result: 2 },
                { coords: [[{ lat: 1, lng: 2 }, { lat: 3, lng: 4 }]], result: 2 },

                { coords: [1, 2], result: 1 },
                { coords: [[1, 2]], result: 1 },
                { coords: [[1, 2], [1, 2]], result: 2 },
                { coords: [[[1, 2], [1, 2]], [1, 2]], result: 3 },
                { coords: [[[[1, 2], [1, 2]], [1, 2]]], result: 3 },
            ];

            tests.forEach((test, i) => {
                it(`Test №${i + 1}`, () => {
                    expect((UtilsPolygonCoords.count(test.coords))).to.be.deep.equals(test.result);
                });
            });
        });

        describe('should get deep', () => {
            const tests = [
                { coords: [], result: 0 },

                { coords: { lat: 1, lng: 2 }, result: 1 },
                { coords: [{ lat: 1, lng: 2 }], result: 2 },
                { coords: [{ lat: 1, lng: 2 }, { lat: 3, lng: 4 }], result: 2 },
                { coords: [[{ lat: 1, lng: 2 }, { lat: 3, lng: 4 }]], result: 3 },

                { coords: [1, 2], result: 1 },
                { coords: [[1, 2]], result: 2 },
                { coords: [[1, 2], [1, 2]], result: 2 },
                { coords: [[[1, 2], [1, 2]], [1, 2]], result: 3 },
                { coords: [[[[1, 2], [1, 2]], [1, 2]]], result: 4 },
                { coords: [[[[[1, 2], [1, 2]], [1, 2]]]], result: 5 },
            ];

            tests.forEach((test, i) => {
                it(`Test №${i + 1}`, () => {
                    expect((UtilsPolygonCoords.deep(test.coords))).to.be.deep.equals(test.result);
                });
            });
        });

        describe('should be normalize', () => {
            const tests = [
                { coords: [], result: [[[]]] },

                { coords: [1, 2], result: [[[1, 2], [1, 2]]] },
                { coords: [[1, 2]], result: [[[1, 2], [1, 2]]] },
                { coords: [[[1, 2]]], result: [[[1, 2], [1, 2]]] },

                { coords: [[[1, 2], [1, 2]]], result: [[[1, 2], [1, 2]]] },
                { coords: [[[1, 2], [3, 4]]], result: [[[1, 2], [3, 4], [1, 2]]] },

                { coords: { lat: 1, lng: 2 }, result: [[[1, 2], [1, 2]]] },
                { coords: [{ lat: 1, lng: 2 }], result: [[[1, 2], [1, 2]]] },
                { coords: [[{ lat: 1, lng: 2 }]], result: [[[1, 2], [1, 2]]] },

                { coords: [[{ lat: 1, lng: 2 }, [3, 4]]], result: [[[1, 2], [3, 4], [1, 2]]] },
                { coords: [[[1, 2]], [[3, 4]]], result: [[[1, 2], [1, 2]], [[3, 4], [3, 4]]] },
            ];

            tests.forEach((test, i) => {
                it(`Test №${i + 1}`, () => {
                    expect((UtilsPolygonCoords.normalize(test.coords))).to.be.deep.equals(test.result);
                });
            });
        });
    });
});
