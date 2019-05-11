import $ from 'jquery';
import { geo, Strategy, PolygonCoords } from 'ultimap';

const osmGeo = geo.byStrategy(new Strategy.Leaflet());
const ymapGeo = geo.byStrategy(new Strategy.Yandex());
const coords = [[
    [57.770131, 40.93134],
    [57.772131, 40.93144],
    [57.772231, 40.93154],
    [57.773231, 40.93164],
    [57.771031, 40.93234],
    [57.771231, 40.93334],
    [57.773131, 40.93434],
    [57.773131, 40.93534],
    [57.773131, 40.93634],
    [57.771531, 40.93734],
    [57.771231, 40.93834],
    [57.770131, 40.93934],
]];
const style = {
    fillColor: '#df362a',
    fillOpacity: 0.33,
    strokeColor: '#df362a',
    strokeOpacity: 0.5,
    strokeWidth: 2,
};
const simpifiedStyle = {
    fillColor: '#0ddf00',
    fillOpacity: 0.33,
    strokeColor: '#0ddf00',
    strokeOpacity: 0.5,
    strokeWidth: 2,
};

class Page {
    constructor() {
        this.osm = osmGeo.map.create($('#osm_holder').get(0), {
                center: [57.767131, 40.928349],
                zoom: 14,
            });
        console.log('OSM Map created', this.osm);

        this.ymap = ymapGeo.map.create($('#ymaps_holder').get(0), {
                center: [57.767131, 40.928349],
                zoom: 14,
            });
        console.log('YMaps Map created', this.ymap);
    }

    simpleCreateMaps() {
        this.destroyPolygons();
        this.osm.load().then((map) => {
            console.log('OSM Map loaded', map);
            this.osmPolygon = osmGeo.polygon.create(coords,  Object.assign({}, style)).addTo(map);
        });
        this.ymap.load().then((map) => {
            console.log('YMaps Map loaded', map);
            this.ymapsPolygon = ymapGeo.polygon.create(coords, Object.assign({}, style)).addTo(map);
        });
    }

    simplification() {
        if (this.osmPolygon) {
            this.osm.load().then((map) => {
                console.log('OSM Map loaded', map);
                const newCoords = this.osmPolygon.getCoords().toSimplified(0.001).toArray();

                this.osmSimplfiedPolygon = osmGeo.polygon.create(newCoords, Object.assign({}, simpifiedStyle)).addTo(map);
            });
        }

        if (this.ymapsPolygon) {
            // this.ymap.load().then((map) => {
            //     console.log('YMaps Map loaded', map);
            //     const newCoords = this.ymapsPolygon.getCoords().toSimplified(0.001).toArray();
            //
            //     this.ymapsSimplfiedPolygon = osmGeo.polygon.create(newCoords, Object.assign({}, simpifiedStyle)).addTo(map);
            // });
        }
    }

    destroyPolygons() {
        if (this.osmPolygon) {
            this.osmPolygon.remove();
            this.osmPolygon = null;
        }

        if (this.osmSimplfiedPolygon) {
            this.osmSimplfiedPolygon.remove();
            this.osmSimplfiedPolygon = null;
        }

        if (this.ymapsPolygon) {
            this.ymapsPolygon.remove();
            this.ymapsPolygon = null;
        }

        if (this.ymapsSimplfiedPolygon) {
            this.ymapsSimplfiedPolygon.remove();
            this.ymapsSimplfiedPolygon = null;
        }
    }
}

$(() => {
    const page = new Page();

    page.simpleCreateMaps();

    $("#create").on('click', () => {
        page.simpleCreateMaps();
    });
    $("#simplification").on('click', () => {
        page.simplification();
    });
});
