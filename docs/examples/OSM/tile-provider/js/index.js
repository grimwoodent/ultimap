import $ from 'jquery';
import { geo } from 'ultimap';
import { Strategy } from 'ultimap/strategy';

$(() => {
    const osm = geo.byStrategy(new Strategy.Leaflet({
        tileLayerProviderLink: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        copyrights: [
            '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
        ],
    })).map.create($('#osm_holder').get(0), {
            center: [57.767131, 40.928349],
            zoom: 12,
        });

    console.log('OSM Map created', osm);
    osm.load().then((map) => {
        console.log('OSM Map loaded', map);
    });

    const osmWikimedia = geo.byStrategy(new Strategy.Leaflet({
        tileLayerProviderLink: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
        copyrights: [
            '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia maps</a>',
            '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
        ],
    })).map.create($('#osm_wikimedia_holder').get(0), {
        center: [57.767131, 40.928349],
        zoom: 12,
    });

    console.log('OSM Wikimedia Map created', osm);
    osmWikimedia.load().then((map) => {
        console.log('OSM Wikimedia Map loaded', map);
    });

    const osmBBBike = geo.byStrategy(new Strategy.Leaflet({
        tileLayerProviderLink: 'http://{s}.tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png',
        copyrights: [
            '<a href="https://bbbike.org/">BBBike</a>',
            '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
        ],
    })).map.create($('#osm_bbbike_holder').get(0), {
        center: [57.767131, 40.928349],
        zoom: 12,
    });

    console.log('OSM BBBike Map created', osm);
    osmBBBike.load().then((map) => {
        console.log('OSM BBBike Map loaded', map);
    });
});
