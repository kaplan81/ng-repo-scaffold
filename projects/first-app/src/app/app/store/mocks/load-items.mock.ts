import * as fromRootAbstracts from '@first-app/abstracts';
import * as fromRootServices from '@first-app/services';
import { Action, ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { SubcribedContainer } from '@project-scope/ng-kit';
import { Observable } from 'rxjs';

export enum ItemsActionTypes {
  LoadItems = '[Feature] Load Items',
  LoadItemsSuccess = '[Feature] Load Items Success'
}

export class LoadItems implements Action {
  readonly type = ItemsActionTypes.LoadItems;
  constructor(public payload: { query: any }) {}
}

export class LoadItemsSuccess implements Action {
  readonly type = ItemsActionTypes.LoadItemsSuccess;
  constructor(public payload: { items: LoadedItemsState }) {}
}

export type ItemsAction = LoadItems | LoadItemsSuccess;

export interface LoadedItemsState {
  loaded: boolean;
}

export const initialState: LoadedItemsState = {
  loaded: false
};

export function reducer(state = initialState, action: ItemsAction): LoadedItemsState {
  switch (action.type) {
    case ItemsActionTypes.LoadItems: {
      console.log('Loading items...');
      return state;
    }
    case ItemsActionTypes.LoadItemsSuccess: {
      console.log('***Images loaded***');
      return { loaded: action.payload.items.loaded };
    }
    default:
      return state;
  }
}
export const featureReducers: ActionReducerMap<any> = {
  items: reducer
};

export const getFeatureState = createFeatureSelector<any>('feature');

export const getItemsLoaded = createSelector(
  getFeatureState,
  (state: { items: LoadedItemsState }): boolean => state.items.loaded
);

export class ItemsGuard extends fromRootAbstracts.CanActivateGuard {
  constructor(private guardService: fromRootServices.GuardService) {
    super();
  }

  canActivateMethod(): Observable<boolean> {
    return this.guardService.canSelect(getItemsLoaded, LoadItems, { query: 1 });
  }
}

export class ItemsContainer extends SubcribedContainer {
  constructor() {
    super();
  }
}
