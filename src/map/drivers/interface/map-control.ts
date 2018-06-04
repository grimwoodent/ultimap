export type TMapControlConstructor = () => void;

export interface IMapControlStrategy {
    createConstructor(
        baseConstructor: TMapControlConstructor,
        onAdd: (parentDomContainer: HTMLElement) => void,
        onRemove: () => void
    ): () => any;
}
