import { BoundsDimension } from './Dimensions';
import { MapObjectStrategy } from './MapStrategy';

export type UpdateGeoObjectPayload = { [key: string]: any };

export interface UpdateGeoObjectOptions {
  editable?: boolean;
  payload?: UpdateGeoObjectPayload;
}

export interface CreateGeoObjectOptions {
  editable?: boolean;
}

export interface GeoObjectStrategy<TCoords, TProps> extends MapObjectStrategy {
  create(coords: TCoords, props: TProps): any;
  getCoords(geoObject: any): TCoords;
  setCoords(geoObject: any, value: TCoords): GeoObjectStrategy<TCoords, TProps>;
  getBounds(geoobject: any): BoundsDimension;
}

export interface EditableGeoObjectStrategy<TCoords, TProps> extends GeoObjectStrategy<TCoords, TProps> {
  setEditable(geoobject: any, value: boolean): EditableGeoObjectStrategy<TCoords, TProps>;
}

export interface GeoStrategy {
  // map: IMapStrategy;
  // marker: IMarkerStrategy;
  // polygon: IPolygonStrategy;
  // circle: ICircleStrategy;
  // mapControl: IMapControlStrategy;
  // domEvent: IDOMEventStrategy;
  // geoEvent: IGeoEventStrategy;
  // preset: {
  //   marker: IMarkerPresetStrategy,
  //   polygon: IPolygonPresetStrategy,
  // };
  // geocoder: IGeocoderStrategy;
  isAllowed(): boolean;
}
