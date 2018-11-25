import { Constructor } from '../constructor';
import { ResponsiveBase } from './responsive.base';
import { KitBreakpointsET, KitQueryTypeET } from './responsive.enum';

// Base argument is always going to be the ResponsiveBase class.
export function responsiveMixin<T extends Constructor<ResponsiveBase>>(
  base: T,
  queryType: KitQueryTypeET,
  mediaSize: KitBreakpointsET
): any {
  return class extends base {
    media: MediaQueryList;
    mediaListener: () => void;

    constructor(...args: any[]) {
      super(...args);
      this.addMediaListener(queryType, mediaSize);
    }
  };
}
