import * as fromFeature1Models from '@first-app-feature1/models';
import * as fromFeature1Actions from '@first-app-feature1/store/actions';
import { feature1Stater, initialState } from '@first-app-feature1/store/reducers/initial';

export function reducer(
  state = initialState,
  action: fromFeature1Actions.EntitiesAction
): fromFeature1Models.Feature1EntitiesState {
  switch (action.type) {
    case fromFeature1Actions.EntitiesActionTypes.LoadEntities: {
      console.log('Loading entities...');
      return { ...state, loading: true };
    }
    case fromFeature1Actions.EntitiesActionTypes.LoadEntitiesSuccess: {
      console.log('***Entities loaded***');
      const addIds: number[] = action.payload.typeEntities.ids;
      const addEntities: { [id: number]: any } =
        action.payload.typeEntities.entities;

      return feature1Stater.add({ ...state, loading: false, loaded: true }, addIds, addEntities);
    }
    case fromFeature1Actions.EntitiesActionTypes.LoadEntitiesSuccess: {
      console.log('***Error loading entity2s***');
      return { ...state, loading: false, loaded: false };
    }
    default:
      return state;
  }
}
