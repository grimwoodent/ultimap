import { Icon } from '../../../icon';

interface YIconProps {
    iconLayout: string,
    iconImageHref: string,
    iconImageSize: [number, number],
    iconImageOffset: [number, number],
}

export class IconFactory {
    public static createBy(icon: Icon): YIconProps {
        if (!icon) {
            throw new Error('Empty icon for create marker');
        }

        const offset: number[] = (icon.offset && Array.isArray(icon.offset))
            ? icon.offset
            : [];

        return {
            iconLayout: 'default#image', // @TODO maybe other layouts
            iconImageHref: icon.src,
            iconImageSize: icon.size,
            // reverse offset values
            iconImageOffset: [
                offset[0] ? -offset[0] : 0,
                offset[1] ? -offset[1] : 0,
            ],
        };
    }
}
