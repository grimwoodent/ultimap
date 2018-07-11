export type TMapControlConstructor = (...args: any[]) => void;

export type TGetControlInstanceHandler = (...args: any[]) => void;

export interface IMapControlStrategy {
    createConstructor(
        baseConstructor: TMapControlConstructor,
        onAdd: (parentDomContainer: HTMLElement) => void,
        onRemove: () => void
    ): Promise<TGetControlInstanceHandler>;
}
