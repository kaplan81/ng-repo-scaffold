import * as fromFeature1Models from '@first-app-feature1/models';
import * as fromRootUtils from '@first-app/store/utils';

export const initialState: fromFeature1Models.Feature1EntitiesState = {
  ids: [],
  entities: {},
  loading: false,
  loaded: false
};

export const feature1Stater: fromRootUtils.Stater<
  any,
  any
> = new fromRootUtils.Stater();
