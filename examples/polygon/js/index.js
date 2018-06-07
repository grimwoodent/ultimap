import $ from 'jquery';
import { geo, Strategy } from 'ultimap';

$(() => {
    const p1 = { lat : 57.769131, lng: 40.93534 };
    const p2 = { lat : 57.765131, lng: 40.91834 };
    const coords = [[
        [p1.lat, p1.lng],
        [p2.lat, p1.lng],
        [p2.lat, p2.lng],
        [p1.lat, p2.lng],
    ]];
    const style = {
        fillColor: '#df362a',
        fillOpacity: 0.33,
        strokeColor: '#df362a',
        strokeOpacity: 0.5,
        strokeWidth: 2,
    };

    const osmGeo = geo.byStrategy(new Strategy.Leaflet());
    const osm = osmGeo.map.create($('#osm_holder').get(0), {
        center: [57.767131, 40.928349],
        zoom: 14,
    });

    console.log('OSM Map created', osm);
    osm.load().then((map) => {
        console.log('OSM Map loaded', map);

        osmGeo.polygon.create(coords,  Object.assign({}, style)).addTo(map);
    });

    const ymapGeo = geo.byStrategy(new Strategy.Yandex());
    const ymap = ymapGeo.map.create($('#ymaps_holder').get(0), {
        center: [57.767131, 40.928349],
        zoom: 14,
    });

    console.log('YMaps Map created', ymap);
    ymap.load().then((map) => {
        console.log('YMaps Map loaded', map);

        ymapGeo.polygon.create(coords, Object.assign({}, style)).addTo(map);
    });
});
