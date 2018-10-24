import { Injectable } from '@angular/core';
import * as fromRootAbstracts from '@first-app/abstracts';
import { MemoizedSelector, select, Store } from '@ngrx/store';
import { SubcribedContainer } from '@project-scope/ng-kit';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuardService {
  constructor(private store: Store<any>) {}

  activateContainer(
    guard: fromRootAbstracts.CanActivateGuard,
    container: SubcribedContainer
  ): Subscription {
    return guard
      .canActivateMethod()
      .pipe(takeUntil(container.destroyed$))
      .subscribe();
  }

  canSelect(selection: MemoizedSelector<any, any>, action: any, payload: any): Observable<boolean> {
    return this.checkStore(selection, action, payload).pipe(
      switchMap(() => of(true)),
      catchError(error => {
        console.error(error);
        return of(false);
      })
    );
  }

  private checkStore(
    selection: MemoizedSelector<any, any>,
    action: any,
    payload: any
  ): Observable<boolean> {
    return this.store.pipe(
      select(selection),
      tap((loaded: boolean) => {
        if (!loaded) {
          this.store.dispatch(new action(payload));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
