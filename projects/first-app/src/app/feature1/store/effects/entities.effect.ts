import { Injectable } from '@angular/core';
import * as fromFeature1Models from '@first-app-feature1/models';
import * as fromApiServices from '@first-app-feature1/services';
import * as entity2sActions from '@first-app-feature1/store/actions/entity2s.action';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class EntitiesEffects {
  @Effect()
  loadEntities$ = this.actions$.pipe(
    ofType(entity2sActions.EntitiesActionTypes.LoadEntities),
    switchMap((action: entity2sActions.LoadEntities) => {
      return this.apiService.getEntity1Entities('type').pipe(
        map(
          (entities: fromFeature1Models.Feature1Entities) =>
            new entity2sActions.LoadEntitiesSuccess({ typeEntities: entities })
        ),
        catchError(error => of(new entity2sActions.LoadEntitiesFail({ error })))
      );
    })
  );

  constructor(private actions$: Actions, private apiService: fromApiServices.ApiService) {}
}
