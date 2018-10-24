/* tslint:disable:no-unused-variable */
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import * as fromRootModels from '@first-app/models';
import { RouterStateService } from '@first-app/services/router-state.service';
import * as fromRootStore from '@first-app/store';
import { Actions } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';

@Component({ selector: 'pref-first-nav', template: '' })
class FirstNavStubComponent {}

describe('RouterStateService', () => {
  let routerStateService: RouterStateService;
  let effects: fromRootStore.RouterEffects;
  let actions$: Observable<any>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'first', component: FirstNavStubComponent }]),
        StoreModule.forRoot({
          ...fromRootStore.reducers
        }),
        StoreRouterConnectingModule
      ],
      declarations: [FirstNavStubComponent],
      providers: [
        { provide: RouterStateSerializer, useClass: fromRootStore.CustomSerializer },
        fromRootStore.RouterEffects,
        fromRootStore.provideMockActions(() => actions$)
      ]
    });
    routerStateService = TestBed.get(RouterStateService);
    effects = TestBed.get(fromRootStore.RouterEffects);
    actions$ = TestBed.get(Actions);
    router = TestBed.get(Router);
    jest.spyOn(router, 'navigate');
  });

  it('can be instantiated via DI', () => {
    expect(routerStateService instanceof RouterStateService).toBe(true);
  });

  it('selectRouterState should select the current router state based on navigation', (done: any) => {
    const action = new fromRootStore.Go({
      path: ['/', 'first'],
      query: { page: 1 },
      extras: { fragment: 'top' },
      callback() {
        routerStateService
          .selectRouterState()
          .subscribe((routerState: fromRootModels.RouterStateUrl) => {
            expect(routerState.url).toBe('/first?page=1#top');
            expect(routerState.queryParams).toEqual({ page: '1' });
            expect(routerState.params).toEqual({ fragment: 'top' });
            done();
          });
      }
    });
    actions$ = of(action);
    effects.navigate$.subscribe((navRoute: fromRootModels.NavRoute) => {
      expect(router.navigate).toHaveBeenCalledWith(navRoute.path, navRoute.query, navRoute.extras);
      done();
    });
  });

  it('selectRouterNavigationId should select the current navigation id', (done: any) => {
    const action = new fromRootStore.Go({
      path: ['/', 'first'],
      callback() {
        routerStateService.selectRouterNavigationId().subscribe((navigationId: number) => {
          expect(navigationId).toBe(1);
          done();
        });
      }
    });
    actions$ = of(action);
    effects.navigate$.subscribe((navRoute: fromRootModels.NavRoute) => {
      expect(router.navigate).toHaveBeenCalledWith(navRoute.path);
      done();
    });
  });
});
