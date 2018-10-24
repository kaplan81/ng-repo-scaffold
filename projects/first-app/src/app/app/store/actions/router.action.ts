import * as fromRootModels from '@first-app/models';
import { Action } from '@ngrx/store';

export enum RouterActionTypes {
  Go = '[Router] Go',
  Back = '[Router] Back',
  Forward = '[Router] Forward'
}

export class Go implements Action {
  readonly type = RouterActionTypes.Go;
  constructor(public payload: fromRootModels.NavRoute) {}
}

export class Back implements Action {
  readonly type = RouterActionTypes.Back;
}

export class Forward implements Action {
  readonly type = RouterActionTypes.Forward;
}

export type Actions = Go | Back | Forward;
