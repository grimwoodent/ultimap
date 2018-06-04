import $ from 'jquery';
import { geo, Strategy } from 'ultimap';

$(() => {
    const osm = geo.byStrategy(new Strategy.Leaflet())
        .map.create($('#osm_holder').get(0), {
            center: [57.767131, 40.928349],
            zoom: 16,
        });

    console.log('OSM Map created', osm);
    osm.load().then((map) => {
        console.log('OSM Map loaded', map);
    });
});