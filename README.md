# Ultimate Map

Universal api for different maps.

# Map

The central class of the API — it is used to create a map on a page and manipulate it.

### Usage example

```
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
