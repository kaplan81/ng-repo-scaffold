import * as fromFeature1Models from '@first-app-feature1/models';
import * as fromRootStore from '@first-app/store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export const reducers: ActionReducerMap<fromFeature1Models.Feature1State> = {
  entities: 'entities',
};

// To select primary state of Feature1.
export const getFeature1State = createFeatureSelector<fromFeature1Models.Feature1State>(
  fromRootStore.featureStates.feature1
);
