import * as fromFeature1Reducers from '@first-app-feature1/store/reducers';
import * as fromRootModels from '@first-app/models';
import * as fromRootReducers from '@first-app/store/reducers';
import * as fromRootUtils from '@first-app/store/utils';
import { createSelector } from '@ngrx/store';

export const getEntitiesState = createSelector(
  fromFeature1Reducers.getFeature1State,
  (feature1: any): fromRootModels.EntitiesState<any> => feature1.entities
);

export const getEntitiesIds = createSelector(
  getEntitiesState,
  (entities: fromRootModels.EntitiesState<any>): number[] => entities.ids
);

export const getEntitiesLoading = createSelector(
  getEntitiesState,
  (entities: fromRootModels.EntitiesState<any>): boolean => entities.loading
);

export const getEntitiesLoaded = createSelector(
  getEntitiesState,
  (entities: fromRootModels.EntitiesState<any>): boolean => entities.loaded
);

export const getSortedEntities = createSelector(
  getEntitiesState,
  (entities: fromRootModels.EntitiesState<any>) => {
    return fromRootUtils.getSortedEntities(entities.ids, entities.entities);
  }
);

export const getRoutedEntity = createSelector(
  getEntitiesState,
  fromRootReducers.getRouterReducerState,
  (
    entities: fromRootModels.EntitiesState<any>,
    routerState: fromRootModels.RouterStateUrl
  ): any => {
    return routerState && entities[routerState.params.entityId];
  }
);
