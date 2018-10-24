export interface Entity {
  id: number;
}

export interface Entities<V extends Entity> {
  ids: number[];
  entities: { [id: number]: V };
}

export interface EntitiesState<V extends Entity> {
  ids: number[];
  entities: { [id: number]: V };
  loading: boolean;
  loaded: boolean;
}
