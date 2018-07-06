import $ from 'jquery';
import moment from 'moment';
import { geo, Strategy } from 'ultimap';

class Log {
    constructor(name, $element) {
        this.name = name;
        this.$element = $element;
    }

    log(title, ...args) {
        console.log(`[${this.name} ${title}]`, ...args);

        if (this.$element) {
            const time = moment().format('H:mm:ss.SS');

            this.$element.append(`<div>[${time}]: ${title}</div>`);
            this.$element.scrollTop(this.$element.get(0).scrollHeight);
        }
    }
}

class Example {
    constructor(opts) {
        this.name = opts.name;
        this.geo = geo.byStrategy(opts.strategy);

        this.console = new Log(this.name, opts.$log);
        this.$holder = opts.$holder;
    }

    create() {
        this.map = this.geo.map.create(this.$holder.get(0), {
            center: [57.767131, 40.928349],
            zoom: 16,
        });

        this.console.log('Map created', this.map);

        return this;
    }

    load() {
        this.map.load().then((map) => {
            this.console.log('Map loaded', map);
            this._initMapEvents();
            this._addMarker();
        });

        return this;
    }

    _initMapEvents() {
        this.map.on(this.geo.event.name.click, (e) => {
            const ev = this.geo.domEvent.create(e);
            const coords = ev.getCoords();

            this.console.log(`Map click ${coords.toString()}`, ev);
        });

        this.map.on(this.geo.event.map.dragstart, (e) => {
            const ev = this.geo.domEvent.create(e);

            this.console.log(`Map drag start`);
        });

        this.map.on(this.geo.event.map.dragend, (e) => {
            const ev = this.geo.domEvent.create(e);

            this.console.log(`Map drag dragend`);
        });

        this.console.log('Map events added');
    }

    _addMarker() {
        this.marker = this.geo.marker.create(this.map.getCenter(), {
            editable: true,
            icon: {
                src: './image/map-marker-black.png',
                size: [32, 32],
                offset: [16, 32],
            },
        }).addTo(this.map);

        this.marker.on(this.geo.event.marker.click, (e) => { this.console.log(`Marker click`); });
        this.marker.on(this.geo.event.marker.mousedown, (e) => { this.console.log(`Marker mousedown`); });
        this.marker.on(this.geo.event.marker.mouseup, (e) => { this.console.log(`Marker mouseup`); });
        this.marker.on(this.geo.event.marker.mouseenter, (e) => { this.console.log(`Marker mouseenter`); });
        this.marker.on(this.geo.event.marker.mouseleave, (e) => { this.console.log(`Marker mouseleave`); });

        this.console.log('Marker added');
    }
}

$(() => {
    (new Example({
        name: 'OSM',
        strategy: new Strategy.Leaflet(),
        $log: $('#osm_log'),
        $holder: $('#osm_holder'),
    })).create().load();

    (new Example({
        name: 'YMaps',
        strategy: new Strategy.Yandex(),
        $log: $('#ymaps_log'),
        $holder: $('#ymaps_holder'),
    })).create().load();
});