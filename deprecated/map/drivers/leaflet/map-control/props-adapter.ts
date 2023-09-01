import { IMapControlProps, MAP_CONTROL_PROPS } from '../../interface/map-control';

type TPosition = 'topleft' | 'topright' | 'bottomleft' | 'bottomright' | 'custom';

export interface IAdaptedProps {
    position?: TPosition;
    [key: string]: any;
}

export interface IAdaptedControlProps {
    position?: {
        top: number | string | 'auto';
        bottom: number | string | 'auto';
        left: number | string | 'auto';
        right: number | string | 'auto';
    };
    [key: string]: any;
}

export class PropsAdapter {
    protected props: IMapControlProps;

    protected adaptedProps: IAdaptedProps = {};

    protected adaptedControlProps: IAdaptedControlProps = {};

    constructor(props: IMapControlProps) {
        this.props = props;

        this.adaptPosition();
    }

    public getAdapted(): IAdaptedProps {
        return this.adaptedProps;
    }

    public getAdaptedControlProps(): IAdaptedControlProps {
        return this.adaptedControlProps;
    }

    protected adaptPosition() {
        const position = this.props[MAP_CONTROL_PROPS.POSITION];

        if (position) {
            this.adaptedProps.position = 'custom';
            this.adaptedControlProps.position = {
                top: position.top,
                bottom: position.bottom,
                left: position.left,
                right: position.right,
            };
        } else {
            const adaptMap: { [key: string]: TPosition } = {
                left: 'topleft',
                right: 'bottomright',
                top: 'topright',
                bottom: 'bottomleft',
            };
            const float = this.props[MAP_CONTROL_PROPS.FLOAT];

            this.adaptedProps.position = adaptMap[float] || adaptMap.left;
        }
    }
}
