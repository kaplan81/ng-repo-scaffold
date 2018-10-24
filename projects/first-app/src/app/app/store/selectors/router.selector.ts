import * as fromRootReducers from '@first-app/store/reducers';
import { createSelector } from '@ngrx/store';

export const getRouterState = createSelector(
  fromRootReducers.getRouterReducerPrimaryState,
  fromRootReducers.getRouterReducerState
);

export const getRouterNavigationId = createSelector(
  fromRootReducers.getRouterReducerPrimaryState,
  fromRootReducers.getRouterReducerNavigationId
);
