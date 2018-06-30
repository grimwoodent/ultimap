import $ from 'jquery';
import { geo, Strategy } from 'ultimap';

$(() => {
    // Open Street
    const osmGeo = geo.byStrategy(new Strategy.Leaflet());
    const osm = osmGeo.map.create($('#osm_holder').get(0), {
        center: [57.767131, 40.928349],
        zoom: 16,
    });
    let osmMarker;

    console.log('OSM Map created', osm);
    osm.load().then((map) => {
        console.log('OSM Map loaded', map);

        osmMarker = osmGeo.marker.create(map.getCenter(), {
            icon: {
                src: './image/map-marker-black.png',
                size: [32, 32],
                offset: [16, 32],
            },
        }).addTo(map);
    });

    // Yandex
    const ymapGeo = geo.byStrategy(new Strategy.Yandex());
    const ymap = ymapGeo.map.create($('#ymaps_holder').get(0), {
        center: [57.767131, 40.928349],
        zoom: 16,
    });
    let ymapsMarker;

    console.log('YMaps Map created', ymap);
    ymap.load().then((map) => {
        console.log('YMaps Map loaded', map);

        ymapsMarker = ymapGeo.marker.create(map.getCenter(), {
            icon: {
                src: './image/map-marker-black.png',
                size: [32, 32],
                offset: [16, 32],
            },
        }).addTo(map);
    });

    // Move to
    const $moveToLat = $('#input-move-to-lat');
    const $moveToLng = $('#input-move-to-lng');

    $('#btn-move-to').on('click', () => {
        const lat = $moveToLat.val() || 0;
        const lng = $moveToLng.val() || 0;

        if (osmMarker) {
            osmMarker.setCoords([lat, lng]);
            osm.setCenter([lat, lng]);
        }

        if (ymapsMarker) {
            ymapsMarker.setCoords([lat, lng]);
            ymap.setCenter([lat, lng]);
        }
    });
});
