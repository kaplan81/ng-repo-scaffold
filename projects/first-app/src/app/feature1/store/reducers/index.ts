// import * as fromFeature1Models from '@first-app-feature1/models';
import * as fromEntities from '@first-app-feature1/store/reducers/entities.reducer';
import * as fromRootStore from '@first-app/store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

// export const reducers: ActionReducerMap<fromFeature1Models.Feature1State> = {
export const reducers: ActionReducerMap<any> = {
  entities: fromEntities.reducer
};

// To select primary state of Feature1.
export const getFeature1State = createFeatureSelector<any>(fromRootStore.featureStates.feature1);
