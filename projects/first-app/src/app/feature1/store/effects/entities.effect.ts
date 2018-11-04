import { Injectable } from '@angular/core';
// import * as fromFeature1Models from '@first-app-feature1/models';
import * as fromApiServices from '@first-app-feature1/services';
import * as entitiesActions from '@first-app-feature1/store/actions/entities.action';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class EntitiesEffects {
  @Effect()
  loadEntities$ = this.actions$.pipe(
    ofType(entitiesActions.EntitiesActionTypes.LoadEntities),
    switchMap((action: entitiesActions.LoadEntities) => {
      return this.apiService.getEntity1Entities('type').pipe(
        map((entities: any) => new entitiesActions.LoadEntitiesSuccess({ typeEntities: entities })),
        catchError(error => of(new entitiesActions.LoadEntitiesFail({ error })))
      );
    })
  );

  constructor(private actions$: Actions, private apiService: fromApiServices.ApiService) {}
}
