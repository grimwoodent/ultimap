export type TGetControlInstanceHandler = (...args: any[]) => any;

export type TControlConstructor = (control: any, ...args: any[]) => void;

export type TOnAddHandler = (control: any, parentDomContainer: HTMLElement) => void;

export type TOnRemoveHandler = (control: any, ) => void;

export interface IMapControlProperties {

}

export enum MAP_CONTROL_PROPS {
    FLOAT = 'float',
    POSITION = 'position',
}

export interface IMapControlProps {
    [MAP_CONTROL_PROPS.FLOAT]: 'left' | 'right' | 'top' | 'bottom';
    [MAP_CONTROL_PROPS.POSITION]: {
        top: number | string | 'auto';
        bottom: number | string | 'auto';
        left: number | string | 'auto';
        right: number | string | 'auto';
    };
    [key: string]: any;
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
