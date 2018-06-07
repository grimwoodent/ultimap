# Ultimate Map

Universal api for different maps.

# Map

The central class of the API — it is used to create a map on a page and manipulate it.

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
|geo.marker.create(coords: *\<Coords\>*, options?: *\<Marker Options\>* | Instantiates a Marker object given a geographical point and optionally an options object. |

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

---

### Methods

| Method | Returns | Description |
| ------ | ------- | ----------- |
| toArray() | *\<array\>* | Returns an array of the form \[number, number\].
| toLatLng() | *\<object\>* | Returns an object of the form {lat: *\<number\>*, lng: *\<number\>*}.
| toPoint() | *\<object\>* | Returns an object of the form {x: *\<number\>*, y: *\<number\>*}.
| getBounds() | *\<Bounds\>* | Returns a new Bounds object.

---



# Bounds

Represents a rectangular geographical area on a map.

### Usage example

``` javascript
import { Bounds } from 'ultimap';

const bounds = new Bounds([57.767131, 40.928349], [57.867131, 40.1028349]);
```

---


