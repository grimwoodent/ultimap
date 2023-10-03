import { EventHandlerFn, EventHandlerFnMap } from './EventHandlers';
import { BoundsDimension, CoordsDimension } from './Dimensions';

export interface MapObjectStrategyWithEvents {
  on(geoObject: any, type: string | EventHandlerFnMap, fn?: EventHandlerFn, context?: any): MapObjectStrategyWithEvents;
  off(geoObject: any, type: string, fn?: EventHandlerFn, context?: any): MapObjectStrategyWithEvents;
}

export interface MapObjectStrategy extends MapObjectStrategyWithEvents {
  addToMap(geoObject: any, map: any): MapObjectStrategy;
  removeFromMap(geoObject: any, map: any): MapObjectStrategy;
}

export interface CreateMapStrategyOptions {
  center?: CoordsDimension;
  bounds?: BoundsDimension;
  zoom?: number;
}

export interface MapStrategy extends MapObjectStrategyWithEvents {
  load(element: HTMLElement, options?: CreateMapStrategyOptions): Promise<any>;
  destroy(map: any): Promise<MapStrategy>;
  setCenter(map: any, value: CoordsDimension): Promise<MapStrategy>;
  getCenter(map: any): CoordsDimension;
  setZoom(map: any, value: number): Promise<MapStrategy>;
  getZoom(map: any): number;
  setBounds(map: any, value: BoundsDimension): Promise<MapStrategy>;
  getBounds(map: any): BoundsDimension;
  fitToViewport(map: any): Promise<MapStrategy>;
  addControl(map: any, control: any): Promise<MapStrategy>;
  removeControl(map: any, control: any): Promise<MapStrategy>;
}
