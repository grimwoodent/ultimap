declare module 'simplify-js' {
    interface IPoint { x: number; y: number; }
    function simplify(points: IPoint[], tolerance?: number, highQuality?: boolean): IPoint[];
    export default simplify;
}
