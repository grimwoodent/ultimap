// Type definitions for node-quick-hull-2d 0.1.0
// Project: https://github.com/andrewseidl/node-quick-hull-2d

declare module 'quick-hull-2d' {
    function convexhull(points: number[][], concavity?: number, lengthThreshold?: number): number[][];
    namespace convexhull {}
    export default convexhull;
}
