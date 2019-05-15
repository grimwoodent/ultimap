import $ from 'jquery';
import { geo, PolygonCoords } from 'ultimap';
import { Strategy } from 'ultimap/strategy';

const osmGeo = geo.byStrategy(new Strategy.Leaflet());
const ymapGeo = geo.byStrategy(new Strategy.Yandex());
const coords = [57.767131, 40.928349];
const style = {
    fillColor: '#df362a',
    fillOpacity: 0.33,
    strokeColor: '#df362a',
    strokeOpacity: 0.5,
    strokeWidth: 2,
};

class Page {
    constructor() {
        this.circles = { };
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

    create() {
        this.remove();
        this.osm.load().then((map) => {
            console.log('OSM Map loaded', map);
            this.circles.osm = osmGeo.circle.create(coords,  Object.assign({ radius: 50 }, style)).addTo(map);
        });
        this.ymap.load().then((map) => {
            console.log('YMaps Map loaded', map);
            // this.circles.ymaps = ymapGeo.polygon.create(coords, { radius: 50 }).addTo(map);
        });
    }

    remove() {
        if (this.circles.osm) {
            this.circles.osm.remove();
            this.circles.osm = null;
        }

        if (this.circles.ymaps) {
            this.circles.ymaps.remove();
            this.circles.ymaps = null;
        }
    }

    setRadius(radius) {
        if (this.circles.osm) {
            this.circles.osm.setRadius(radius);
        }
    }
}

$(() => {
    const page = new Page();

    page.create();

    $('#create').on('click', () => {
        page.create();
    });
    $('#remove').on('click', () => {
        page.remove();
    });
    $('#set_radius').on('click', () => {
        page.setRadius($('#radius').val());
    });
});
