import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as fromRootModels from '@first-app/models';
import * as fromRouterStore from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export const reducers: ActionReducerMap<fromRootModels.AppState> = {
  router: fromRouterStore.routerReducer
};

// To select primary states of the application.
export const getRouterReducerPrimaryState = createFeatureSelector<fromRootModels.RouterState>(
  'router'
);

// To get ROUTER_NAVIGATION payload: state and navigationId.
// This normally would go in a .reducer.ts file but there is not any in this case.
export const getRouterReducerState = (
  state: fromRootModels.RouterState
): fromRootModels.RouterStateUrl => state.state;
export const getRouterReducerNavigationId = (state: fromRootModels.RouterState): number =>
  state.navigationId;

// To provide as RouterStateSerializer in AppModule.
export class CustomSerializer
  implements fromRouterStore.RouterStateSerializer<fromRootModels.RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): fromRootModels.RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;
    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    // BUG in @ngrx/router-store: state.params object is always empty!
    const params = {
      ...state.params,
      fragment: state.fragment
    };

    return { url, queryParams, params };
  }
}
