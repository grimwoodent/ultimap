export const falseFn = () => false;

export const uid = (() => {
    let id = 1;
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };

    return {
        next: () => `${s4()}${s4()}${s4()}${s4()}${id++}`,
    };
})();
