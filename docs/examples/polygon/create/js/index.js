import $ from 'jquery';
import { geo, PolygonCoords } from 'ultimap';
import { Strategy } from 'ultimap/strategy';

const osmGeo = geo.byStrategy(new Strategy.Leaflet());
const ymapGeo = geo.byStrategy(new Strategy.Yandex());
const coords = [[
    [57.769131, 40.93534],
    [57.770131, 40.93434],
    [57.767131, 40.94234],
    [57.764131, 40.93434],
    [57.765131, 40.93534],
    [57.765131, 40.91834],
    [57.767131, 40.92534],
    [57.769131, 40.91834],
]];
const style = {
    fillColor: '#df362a',
    fillOpacity: 0.33,
    strokeColor: '#df362a',
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

    createByConcaveHullCreateMaps() {
        this.destroyPolygons();
        this.osm.load().then((map) => {
            console.log('OSM Map loaded', map);
            this.osmPolygon = osmGeo.polygon.create([PolygonCoords.createByConcaveHull(coords[0]).toArray()],  Object.assign({}, style)).addTo(map);
        });
        this.ymap.load().then((map) => {
            console.log('YMaps Map loaded', map);
            this.ymapsPolygon = ymapGeo.polygon.create([PolygonCoords.createByConcaveHull(coords[0]).toArray()], Object.assign({}, style)).addTo(map);
        });
    }

    createByConvexHullCreateMaps() {
        this.destroyPolygons();
        this.osm.load().then((map) => {
            console.log('OSM Map loaded', map);
            this.osmPolygon = osmGeo.polygon.create([PolygonCoords.createByConvexHull(coords[0]).toArray()],  Object.assign({}, style)).addTo(map);
        });
        this.ymap.load().then((map) => {
            console.log('YMaps Map loaded', map);
            this.ymapsPolygon = ymapGeo.polygon.create([PolygonCoords.createByConvexHull(coords[0]).toArray()], Object.assign({}, style)).addTo(map);
        });
    }

    destroyPolygons() {
        if (this.osmPolygon) {
            this.osmPolygon.remove();
            this.osmPolygon = null;
        }

        if (this.ymapsPolygon) {
            this.ymapsPolygon.remove();
            this.ymapsPolygon = null;
        }
    }
}

$(() => {
    const page = new Page();

    page.simpleCreateMaps();

    $("#simple_create").on('click', () => {
        page.simpleCreateMaps();
    });
    $("#concave_hull_create").on('click', () => {
        page.createByConcaveHullCreateMaps();
    });
    $("#convex_hull_create").on('click', () => {
        page.createByConvexHullCreateMaps();
    });
    $("#remove_polygons").on('click', () => {
        page.destroyPolygons();
    });
});
