# Ultimate Map

Universal api for different maps.

---  

### Examples

##### Common

- [Basic usage](https://grimwoodent.github.io/ultimap/examples/basic/)
- [Add map controls](https://grimwoodent.github.io/ultimap/examples/controls/)
- [Map events](https://grimwoodent.github.io/ultimap/examples/events/)
- [Markers](https://grimwoodent.github.io/ultimap/examples/marker/)

#### Polygon

- [Create](https://grimwoodent.github.io/ultimap/examples/polygon/create/)

##### OSM

- [OSM change tile provider](https://grimwoodent.github.io/ultimap/examples/OSM/tile-provider/)

---  

#### Api Contents
- [Geo](#geo)
- [Map](#map)
- [Marker](#marker)
- [Polygon](#polygon)
- [Coords](#coords)
- [Bounds](#bounds)
- [PolygonCoords](#polygoncoords)

---

# Geo

The central class of the API - it is used for get access for other classes.

### Usage example
``` javascript
import { Geo, geo } from 'ultimap';
import { Strategy } from 'ultimap/strategy';
// or // import { Strategy } from 'ultimap/strategy/leaflet';
// or // import { Strategy } from 'ultimap/strategy/yandex';

const ugeo = geo.byStrategy(new Strategy.Leaflet());
// or // const ugeo = (new Geo(new Strategy.Leaflet()))
// or // const ugeo = (new Geo(new Strategy.Yandex()))

// include yandex api script to your page for Yandex Strategy
// Leaflet api scripts dependencies included in Leaflet Strategy
```

### Constructor

| Factory | Description |
| ------- | ----------- |
| new Geo(strategy: *\<GeoStrategy\>*)| Create new geo-controller. |

### Methods

| Method | Returns | Description |
| ------ | ------- | ----------- |
| getStrategy() | *\<GeoStrategy\>* | Get the current work strategy. |
| setStrategy(strategy: *\<GeoStrategy\>*) | *\<Geo\>* | Set the current work strategy. |
| byStrategy(strategy: *\<GeoStrategy\>*) | *\<Geo\>* | Create new geo-controller for the strategy. |
| isAllowed() | *\<boolean\>* | Check is the strategy is allowed to work. |
| map | *\<Map\>* | Create new Map controller. |
| marker | *\<Marker\>* | Create new Marker controller. |
| polygon | *\<Polygon\>* | Create new Polygon controller. |
| control | *\<MapControlController\>* | Create new MapControl controller. |
| domEvent | *\<DOMEvent\>* | Create new DOMEvent controller. |
| event | *\<GeoEvent\>* | Create new GeoEvent controller. |
| geocoder | *\<Geocoder\>* | Create new Geocoder controller. |
| preset | *\<object\>* | Returns object with preset controllers. |
| Collections | *\<object\>* | Contains object with Collections controllers and settings. |

---

# Map

The class is used to create a map on a page and manipulate it.

### Usage example

``` javascript
import { geo } from 'ultimap';

geo.map.create(document.getElementById('map'), {
    center: [57.767131, 40.928349],
    zoom: 13,
}).load();
```

### Constructor

| Factory | Description |
| ------- | ----------- |
|geo.map.create(el: *\<HTMLElement\>*, options?: *\<Map Options\>*)| Instantiates a map object given an instance of a <div> HTML element and optionally an object literal with Map options.

### Methods

| Method | Returns | Description |
| ------ | ------- | ----------- |
| create(element: *\<HTMLElement\>*, options: *\<Map Update Properties\>*) | *\<[Map](#map)\>* ||
| load() | *\<Promise\<[Map](#map)\>\>* ||
| destroy() | *\<Promise\<[Map](#map)\>\>* ||
| updateProperties(options: *\<Map Update Properties\>*) | *\<Promise\<[Map](#map)\>\>* ||
| hasInstance() | *\<boolean\>* ||
| getInstance() | *\<object\>* ||
| setCenter(coords: *\<[Coords](#coords) constructor params\>*) | *\<Promise\<[Map](#map)\>\>* ||
| getCenter() | *\<[Coords](#coords)\>* ||
| setZoom(value: *\<number\>*) | *\<Promise\<[Map](#map)\>\>* ||
| getZoom() | *\<number\>* ||
| setBounds(coords: *\<[Bounds](#bounds) constructor params\>*) | *\<Promise\<[Map](#map)\>\>* ||
| getBounds() | *\<[Bounds](#bounds)\>* ||
| fitToViewport() | *\<Promise\<[Map](#map)\>\>* ||
| addControl(control: *\<object\>*) | *\<Promise\<[Map](#map)\>\>* ||
| removeControl(control: *\<object\>*) | *\<Promise\<[Map](#map)\>\>* ||
| on(type: *\<string\>*, fn: *\<function\>*) | *\<[Map](#map)\>* ||
| off(type: *\<string\>*, fn: *\<function\>*) | *\<[Map](#map)\>* ||

---



# Marker

Marker is used to display icons on the map.

### Usage example

``` javascript
import { geo } from 'ultimap';

geo.marker.create([57.767131, 40.928349], {
    icon: {
        src: './image/map-marker-black.png',
        size: [32, 32],
        offset: [16, 32],
    },
}).addTo(map);
```

### Constructor

| Factory | Description |
| ------- | ----------- |
|geo.marker.create(coords: *\<[Coords](#coords) constructor params\>*, options?: *\<Marker Options\>*) | Instantiates a Marker object given a geographical point and optionally an options object. |

### Methods

| Method | Returns | Description |
| ------ | ------- | ----------- |
|getUid()|*\<string\>*||
|setCoords(coords: *\<Coords constructor params\>*)|*\<Promise\<Marker\>\>*||
|getCoords()|*\<Coords\>*||
|getBounds()|*\<Bounds\>*||
|addTo(map: *\<Map\>*)|*\<Marker\>*||
|remove()|*\<Marker\>*||
|getMap()|*\<Map\>*||
|onMap()|*\<boolean\>*||
|clone()|*\<Marker\>*||
|setEditable(value: *\<boolean\>*)|*\<Promise\<Marker\>\>*||
|setData(value: *\<object\>*)|*\<Promise\<Marker\>\>*||
|getData()|*\<object\>*||
|setIcon(value: *\<object\>*)|*\<Marker\>*||
|setPreset(value: *\<string\>*)|*\<Marker\>*||

---

# Polygon

Polygon is used to display area on the map.

### Usage example

``` javascript
import { geo } from 'ultimap';

geo.polygon.create([[
   [57.79968313324691,40.94109504772947],
   [57.77263617196502,40.87964027478026],
   [57.740061158662854,40.91328590466307],
   [57.74354947014791,41.01868599011228],
   [57.798949924647765,41.031903916137665],
   [57.79968313324691,40.94109504772947],
]], { }).addTo(map);
```

### Constructor

| Factory | Description |
| ------- | ----------- |
|geo.polygon.create(coords: *\[[<[Coords](#coords) constructor params\>]]*, options?: *\<Polygon Options\>*)| Instantiates a Polygon object given a geographical points and optionally an options object. |

### Methods

| Method | Returns | Description |
| ------ | ------- | ----------- |
|getUid()|*\<string\>*||
|setCoords(coords: *[[\<Coords constructor params\>]]*)|*\<Promise\<Polygon\>\>*||
|getCoords()|*[[\<Coords\>]]*||
|getBounds()|*\<Bounds\>*||
|addTo(map: *\<Map\>*)|*\<Polygon\>*||
|remove()|*\<Polygon\>*||
|getMap()|*\<Map\>*||
|onMap()|*\<boolean\>*||
|clone()|*\<Polygon\>*||
|setEditable(value: *\<boolean\>*)|*\<Promise\<Polygon\>\>*||
|setData(value: *\<object\>*)|*\<Promise\<Polygon\>\>*||
|getData()|*\<object\>*||
|setStyle(style: *\<Polygon style options\>*):|*\<Promise<Polygon>\>*||
|setPreset(value: *\<string\>*):|*\<Promise\<Polygon\>\>*||
|setDrawing(value: *\<boolean\>*):|*\<Promise\<Polygon\>\>*||

---



# Coords

Represents a geographical point with a certain latitude and longitude.

### Usage example

``` javascript
import { Coords } from 'ultimap';

const coords = new Coords(57.767131, 40.928349);
```

### Constructor

| Factory | Description |
| ------- | ----------- |
|new Coords(lat: *\<number\>*, lng: *\<number\>*)| Creates an object representing a geographical point with the given latitude and longitude. |
|new Coords(lat: *\<string\>*, lng: *\<string\>*)| Creates an object representing a geographical point with the given latitude and longitude. |
|new Coords(coords: *\<array\>*) | Expects an array of the form \[number, number\]. |
|new Coords(coords: *\<object\>*) | Expects an plain object of the form {lat: number, lng: number}. |

### Methods

| Method | Returns | Description |
| ------ | ------- | ----------- |
| toArray() | *\<array\>* | Returns an array of the form \[number, number\].
| toLatLng() | *\<object\>* | Returns an object of the form {lat: *\<number\>*, lng: *\<number\>*}.
| toPoint() | *\<object\>* | Returns an object of the form {x: *\<number\>*, y: *\<number\>*}.
| getBounds() | *\<Bounds\>* | Returns a new Bounds object.
| toJson() | *\<string\>* | Returns a string with json of the form {lat: number, lng: number}.
| toString() | *\<string\>* | Returns a string of the form [number, number].

---



# Bounds

Represents a rectangular geographical area on a map.

### Usage example

``` javascript
import { Bounds } from 'ultimap';

const bounds = new Bounds([57.767131, 40.928349], [57.867131, 40.1028349]);
```

### Methods

| Method | Returns | Description |
| ------ | ------- | ----------- |
|toLatLng()| *\<array\>* | Returns an array of the form \[{lat: *\<number\>*, lng: *\<number\>*}, {lat: *\<number\>*, lng: *\<number\>*}\]. |
|toArray()| *\<array\>* | Returns an array of the form \[\[*\<number\>*, *\<number\>*\], \[*\<number\>*, *\<number\>*\]\]. |
|toPoint()| *\<array\>* | Returns an array of the form \[{x: *\<number\>*, y: *\<number\>*}, {x: *\<number\>*, y: *\<number\>*}\]. |
|toRectangle(closed: *\<boolean\>*)| *\<array\>* | Returns an array of rectangle points of form \[*\<number\>*, *\<number\>*\]. |

---


# PolygonCoords

Represents an array of geographical points for polygon.

### Usage example

``` javascript
import { PolygonCoords } from 'ultimap';

const coords = new PolygonCoords([[57.767131, 40.928349], [57.867131, 40.1028349], [57.767131, 40.928349]]);

ymapGeo.polygon.create(coords.toArray(), {}).addTo(map);
```

### Constructor

| Factory | Description |
| ------- | ----------- |
|new PolygonCoords(coords: *\<array\>*)| Create polygon coords object by array of [Coords](#coords) constructor params.|
|PolygonCoords.createByConcaveHull(coords: *\<array\>*)| Create concave hull of point before create object. |
|PolygonCoords.createByConvexHull(coords: *\<array\>*)| Create convex hull of point before create object. |

### Methods

| Method | Returns | Description |
| ------ | ------- | ----------- |
|toArray()| *\<array\>* | |
|toNormalizeArray()| *\<\[\[\[number, number\]\]\]\\>* | |
|toJson(normalize: *\<boolean\>*)| *\<string\>* | |
|getCount()| *\<number\>* | |
|getBounds()| *\<[Bounds](#bounds)\>* | |
|toSimplified()| *\<PolygonCoords\>* | |

---
