import { Params } from '@angular/router';
import * as fromRouterStore from '@ngrx/router-store';

export interface AppState {
  router: RouterState;
}

export type RouterState = fromRouterStore.RouterReducerState<RouterStateUrl>;

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}
