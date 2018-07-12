export type TGetControlInstanceHandler = (...args: any[]) => any;

export type TControlConstructor = (...args: any[]) => void;

export type TOnAddHandler = (parentDomContainer: HTMLElement) => void;

export type TOnRemoveHandler = () => void;

export interface IMapControlProperties {

}

export enum MAP_CONTROL_EVENTS {
    ON_ADD = 'onAdd',
    ON_REMOVE = 'onRemove',
}

export interface IMapControlEvents {
    [MAP_CONTROL_EVENTS.ON_ADD]?: (parentDomNode: HTMLElement) => void;
    [MAP_CONTROL_EVENTS.ON_REMOVE]?: () => void;
}

export interface IMapControlStrategy {
    getControlInstanceConstructor(): Promise<TGetControlInstanceHandler>;
}
