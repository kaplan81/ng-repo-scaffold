import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';
import { KitBreakpoints, KitBreakpointsET, KitQueryTypeET } from './responsive.enum';

export class ResponsiveBase {
  media: MediaQueryList;
  mediaListener: () => void;

  constructor(public changeDetectorRef: ChangeDetectorRef, public mediaMatcher: MediaMatcher) {}

  // To be implemented in mixin constructor.
  addMediaListener(queryType: KitQueryTypeET, mediaSize: KitBreakpointsET): void {
    const query: string =
      queryType === 'smallerThan' ? this.maxMedia(mediaSize) : this.minMedia(mediaSize);

    this.media = this.mediaMatcher.matchMedia(query);
    this.mediaListener = () => this.changeDetectorRef.detectChanges();
    this.media.addListener(this.mediaListener);
  }

  // To be implemented OnDestroy.
  removeMediaListener() {
    this.media.removeListener(this.mediaListener);
  }

  private getBreakpoint(mediaSize: KitBreakpointsET): number {
    let breakpoint: number;

    switch (mediaSize) {
      case 'xs': {
        breakpoint = KitBreakpoints.xs;
        break;
      }
      case 'sm': {
        breakpoint = KitBreakpoints.sm;
        break;
      }
      case 'md': {
        breakpoint = KitBreakpoints.md;
        break;
      }
      case 'lg': {
        breakpoint = KitBreakpoints.lg;
        break;
      }
      case 'xl': {
        breakpoint = KitBreakpoints.xl;
        break;
      }
      default:
        breakpoint = KitBreakpoints.md;
    }

    return breakpoint;
  }

  private maxMedia(mediaSize: KitBreakpointsET): string {
    const breakpoint: number = this.getBreakpoint(mediaSize);
    const pixels: string = breakpoint - 1 + 'px';

    return `(max-width: ${pixels})`;
  }

  private minMedia(mediaSize: KitBreakpointsET): string {
    const breakpoint: number = this.getBreakpoint(mediaSize);
    const pixels: string = breakpoint + 'px';

    return `(min-width: ${pixels})`;
  }
}
