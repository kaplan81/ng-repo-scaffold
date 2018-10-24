import { Injectable } from '@angular/core';
import * as fromRootModels from '@first-app/models';
import * as fromRootStore from '@first-app/store';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouterStateService {
  constructor(private store: Store<fromRootModels.RouterState>) {}

  selectRouterState(): Observable<fromRootModels.RouterStateUrl> {
    return this.store.pipe(select(fromRootStore.getRouterState)).pipe(take(1));
  }

  selectRouterNavigationId(): Observable<number> {
    return this.store.pipe(select(fromRootStore.getRouterNavigationId)).pipe(take(1));
  }
}
