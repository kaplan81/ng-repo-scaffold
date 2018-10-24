import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import * as fromRootModels from '@first-app/models';
import * as routerActions from '@first-app/store/actions/router.action';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class RouterEffects {
  @Effect({ dispatch: false })
  navigate$ = this.actions$.pipe(
    ofType(routerActions.RouterActionTypes.Go),
    map((action: routerActions.Go) => action.payload),
    tap((navRoute: fromRootModels.NavRoute) => {
      this.navigate(navRoute);
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.pipe(
    ofType(routerActions.RouterActionTypes.Back),
    tap(() => this.location.back())
  );

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$.pipe(
    ofType(routerActions.RouterActionTypes.Forward),
    tap(() => this.location.forward())
  );

  constructor(private actions$: Actions, private router: Router, private location: Location) {}

  private navigate(navRoute: fromRootModels.NavRoute): void {
    const navigationExtras: NavigationExtras = this.setNavigationExtras(navRoute);
    if (navRoute.callback !== undefined) {
      this.router.navigate(navRoute.path, navigationExtras).then(navRoute.callback);
    } else {
      this.router.navigate(navRoute.path, navigationExtras);
    }
  }

  private setNavigationExtras(navRoute: fromRootModels.NavRoute): NavigationExtras {
    return {
      ...(navRoute.query && { queryParams: navRoute.query }),
      ...(navRoute.extras && { ...navRoute.extras })
    };
  }
}
