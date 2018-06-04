import $ from 'jquery';
import { geo, Strategy } from 'ultimap';

$(() => {
    const osmGeo = geo.byStrategy(new Strategy.Leaflet());
    const osm = osmGeo.map.create($('#osm_holder').get(0), {
        center: [57.767131, 40.928349],
        zoom: 16,
    });

    console.log('OSM Map created', osm);
    osm.load().then((map) => {
        console.log('OSM Map loaded', map);

        osmGeo.marker.create(map.getCenter(), {
            icon: {
                src: './image/map-marker-black.png',
                size: [32, 32],
                offset: [16, 32],
            },
        }).addTo(map);
    });

    const ymapGeo = geo.byStrategy(new Strategy.Yandex());
    const ymap = ymapGeo.map.create($('#ymaps_holder').get(0), {
        center: [57.767131, 40.928349],
        zoom: 16,
    });

    console.log('YMaps Map created', ymap);
    ymap.load().then((map) => {
        console.log('YMaps Map loaded', map);

        ymapGeo.marker.create(map.getCenter(), {
            icon: {
                src: './image/map-marker-black.png',
                size: [32, 32],
                offset: [16, 32],
            },
        }).addTo(map);
    });
});
