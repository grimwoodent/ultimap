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
            this.createControl();
        });

        return this;
    }

    createControl() {
        const mapControl = this.geo.control.element
            .setConstructor((control, name) => {
                control.name = name;
                control.$element = $(`<div class="panel panel-default">
                        <div class="panel-heading">${control.name}</div>
                        <div class="panel-body">
                            <button class="js-click-me btn btn-xs btn-default">Click me!</button>
                            <button class="js-remove-me btn btn-xs btn-default">Remove me!</button>
                        </div>
                    </div>`);
                control.$element
                    .on('click', '.js-click-me', () => {
                        this.console.log('Control button clicked!');
                    })
                    .on('click', '.js-remove-me', () => {
                        this.map.removeControl(control);
                        this.console.log('Control removed from map');
                    });
            })
            .setOnAddHandler((control, parentDomContainer) => {
                control.$element.appendTo(parentDomContainer);
            })
            .setOnRemoveHandler((control) => {
                control.$element.detach().remove();
            });

        mapControl
            .create({
                float : 'left',
            }, `${this.name} 1`)
            .then((control) => {
                this.console.log('Control Created');
                this.map.addControl(control);
                this.console.log('Control added to map', control.name);
            }, (message) => {
                this.console.log('Control Create Error', message);
            });

        mapControl
            .create({
                float : 'top',
            }, `${this.name} 2`)
            .then((control) => {
                this.console.log('Control Created');
                this.map.addControl(control);
                this.console.log('Control added to map', control.name);
            }, (message) => {
                this.console.log('Control Create Error', message);
            });

        mapControl
            .create({
                position : {
                    bottom: '30px',
                    right: '40px',
                },
            }, `${this.name} 3`)
            .then((control) => {
                this.console.log('Control Created');
                this.map.addControl(control);
                this.console.log('Control added to map', control.name);
            }, (message) => {
                this.console.log('Control Create Error', message);
            });
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
