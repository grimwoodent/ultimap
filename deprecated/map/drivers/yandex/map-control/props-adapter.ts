import { IMapControlProps, MAP_CONTROL_PROPS } from '../../interface/map-control';

type TFloat = 'top' | 'right' | 'bottom' | 'left' | 'none';

export interface IAdaptedProps {
    float?: TFloat;
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

    constructor(props: IMapControlProps) {
        this.props = props;

        this.adaptPosition();
    }

    public getAdapted(): IAdaptedProps {
        return this.adaptedProps;
    }

    protected adaptPosition() {
        const position = this.props[MAP_CONTROL_PROPS.POSITION];

        if (position) {
            this.adaptedProps.float = 'none';
            this.adaptedProps.position = {
                top: position.top,
                bottom: position.bottom,
                left: position.left,
                right: position.right,
            };
        } else {
            const adaptMap: { [key: string]: TFloat } = {
                left: 'left',
                right: 'right',
                top: 'top',
                bottom: 'bottom',
            };
            const float = this.props[MAP_CONTROL_PROPS.FLOAT];

            this.adaptedProps.float = adaptMap[float] || adaptMap.left;
        }
    }
}
