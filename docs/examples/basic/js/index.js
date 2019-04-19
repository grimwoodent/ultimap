import $ from 'jquery';
import { geo, Strategy } from 'ultimap';

class Page {
    constructor() {
        this.osm = geo.byStrategy(new Strategy.Leaflet())
            .map.create($('#osm_holder').get(0), {
                center: [57.767131, 40.928349],
                zoom: 16,
            });
        console.log('OSM Map created', this.osm);

        this.ymap = geo.byStrategy(new Strategy.Yandex())
            .map.create($('#ymaps_holder').get(0), {
                center: [57.767131, 40.928349],
                zoom: 16,
            });
        console.log('YMaps Map created', this.ymap);

        // this.gmap = geo.byStrategy(new Strategy.Google())
        //     .map.create($('#gmap_holder').get(0), {
        //         center: [57.767131, 40.928349],
        //         zoom: 16,
        //     });
        // console.log('Google Map created', this.gmap);
    }

    createMaps() {
        this.osm.load().then((map) => {
            console.log('OSM Map loaded', map);
        });
        this.ymap.load().then((map) => {
            console.log('YMaps Map loaded', map);
        });
        // this.gmap.load().then((map) => {
        //     console.log('Google Map loaded', map);
        // });
    }

    destroyMaps() {
        this.osm.destroy();
        this.ymap.destroy();
        // this.gmap.destroy();
    }
}

$(() => {
    const page = new Page();

    page.createMaps();

    $("#btn_create").on('click', () => {
        page.createMaps();
    });
    $("#btn_destroy").on('click', () => {
        page.destroyMaps();
    });
});
