import { NavigationExtras, Params } from '@angular/router';

export interface NavRoute<P> {
  path: ['/', ...P[]];
  query?: Params;
  extras?: NavigationExtras;
  callback?: (value?: any) => any;
}

export interface NavLink<P> extends NavRoute<P> {
  text: string;
  icon?: string;
}
