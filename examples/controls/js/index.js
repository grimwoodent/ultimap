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
        const mapControl = this.geo.mapControl;
        const $element = $(`<div class="panel" style="padding:15px;">
            <button class="js-click-me btn btn-default">Click me!</button>
            <button class="js-remove-me btn btn-default">Remove me!</button>
        </div>`);

        $element.on('click', '.js-click-me', () => {
            this.console.log('Control button clicked!');
        });

        mapControl
            .createConstructor(function controlConstructor(name) {
                this.name = name;
            }, function onAdd(parentDomContainer) {
                $element.appendTo(parentDomContainer);
            }, function onRemove() {
                $element.detach().remove();
            }).then(() => {
                mapControl.createControl(this.name)
                    .then((instance) => {
                        this.console.log('Control Created');
                        this.map.addControl(instance);
                        this.console.log('Control added to map', instance.name);

                        $element.on('click', '.js-remove-me', () => {
                            this.map.removeControl(instance);
                            this.console.log('Control removed from map');
                        });
                    }, (message) => {
                        this.console.log('Control Create Error', message);
                    });
        }, (message) => {
            this.console.log('Control Constructor Create Error', message);
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
