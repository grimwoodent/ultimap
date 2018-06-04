type tSize = [number, number];

export interface IIcon {
    src: string;
    size: tSize;
    offset: tSize;
}

export class Icon {
    public src: string;
    public size: tSize;
    public offset: tSize;

    constructor(src: string | IIcon, size?: tSize, offset?: tSize) {
        if (typeof(src) === 'object') {
            this.src = src.src;
            this.size = src.size;
            this.offset = src.offset;
        } else {
            this.src = src;
            this.size = size;
            this.offset = offset;
        }

        if (!this.src || !this.size) {
            throw new Error('Empty icon');
        }
    }

    public toObject() {
        return {
            src: this.src,
            size: this.size,
            offset: this.offset,
        };
    }
}
