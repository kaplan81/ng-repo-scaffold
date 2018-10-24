import { Action } from '@ngrx/store';

export enum EntitiesActionTypes {
  LoadEntities = '[Feature1] Load Entities',
  LoadEntitiesSuccess = '[Feature1] Load Entities Success',
  LoadEntitiesFail = '[Feature1] Load Entities Fail'
}

export class LoadEntities implements Action {
  readonly type = EntitiesActionTypes.LoadEntities;
  constructor(public payload: { type: string; }) {}
}

export class LoadEntitiesSuccess implements Action {
  readonly type = EntitiesActionTypes.LoadEntitiesSuccess;
  constructor(public payload: { typeEntities: any }) {}
}

export class LoadEntitiesFail implements Action {
  readonly type = EntitiesActionTypes.LoadEntitiesFail;
  constructor(public payload: { error: any }) {}
}

export type EntitiesAction = LoadEntities | LoadEntitiesSuccess | LoadEntitiesFail;
