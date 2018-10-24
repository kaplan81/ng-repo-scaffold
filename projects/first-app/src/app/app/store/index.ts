export * from '@first-app/store/actions';
export * from '@first-app/store/effects';
export * from '@first-app/store/mocks';
export * from '@first-app/store/reducers';
export * from '@first-app/store/selectors';
export * from '@first-app/store/utils';

// Unfortunately we canot do this with an enum.
// StoreModule does not take strings from enums as parameters.
export const featureStates = {
  feature1: 'feature1'
};
