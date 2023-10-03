export interface Point {
  x: number;
  y: number;
}

export type SimpleCoords = [number, number];

export type Coord = number | string;

export interface LatLng {
  lat: Coord;
  lng: Coord;
}

export type Coords = [Coord, Coord] | LatLng;

export interface CoordsDimension {
  lat: number;
  lng: number;
  toArray(): SimpleCoords;
  toLatLng(): { lat: number; lng: number };
  toPoint(): Point;
  toJson(): string;
  toString(): string;
  getBounds(): BoundsDimension;
}

export interface BoundsDimension {
  toLatLng(): LatLng[];
  toArray(): [SimpleCoords, SimpleCoords];
  toPoint(): Point[];
  toRectangle(closed?: boolean): SimpleCoords[];
  // @TODO remove Circular dependency
  getCenter(): CoordsDimension;
}
