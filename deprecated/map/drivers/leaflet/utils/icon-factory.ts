import * as L from 'leaflet';
import { Icon as LIcon } from 'leaflet';
import { Icon } from '../../../icon';

class IconFactory {
    public createBy(icon: Icon): LIcon {
        if (!icon) {
            throw new Error('Empty icon for create marker');
        }

        return L.icon({
            iconUrl: icon.src || null,
            iconSize: icon.size || null,
            iconAnchor: icon.offset || null,
        });
    }
}

export const iconFactory = new IconFactory();
