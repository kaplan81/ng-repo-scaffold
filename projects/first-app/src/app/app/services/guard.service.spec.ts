import { TestBed } from '@angular/core/testing';
import * as fromRootAbstracts from '@first-app/abstracts';
import * as fromRootServices from '@first-app/services';
import { GuardService } from '@first-app/services/guard.service';
import * as fromRootStore from '@first-app/store';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { cold } from 'jest-marbles';

describe('GuardService', () => {
  let guardService: fromRootServices.GuardService;
  let store: Store<any>;
  let guard: fromRootAbstracts.CanActivateGuard;
  let container: fromRootStore.ItemsContainer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRootStore.reducers,
          feature: combineReducers(fromRootStore.featureReducers)
        })
      ]
    });
    guardService = TestBed.get(GuardService);
    store = TestBed.get(Store);
    guard = new fromRootStore.ItemsGuard(guardService);
    container = new fromRootStore.ItemsContainer();
    jest.spyOn(store, 'dispatch');
  });

  it('can be instantiated via DI', () => {
    expect(guardService instanceof GuardService).toBe(true);
  });

  it('canActivate should initially return an empty observable', () => {
    const expected = cold('-');

    expect(guard.canActivate()).toBeObservable(expected);
  });

  it('activateContainer dispatches loading actions so that canActivate returns an observable of true', () => {
    const expected = cold('(a|)', { a: true });

    guardService.activateContainer(guard, container);

    expect(store.dispatch).toHaveBeenCalledTimes(1);

    store.dispatch(new fromRootStore.LoadItemsSuccess({ items: { loaded: true } }));

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(guard.canActivate()).toBeObservable(expected);
  });
});
