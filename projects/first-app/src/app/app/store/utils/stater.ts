import * as fromRootModels from '@first-app/models';

/**
 * For reducers
 * This class groups methods that are going to be used
 * by NGRX elements rather than being injected
 * in an Angular element.
 * That is why it is not expressed as a service.
 * Spread operator makes trouble with prevState
 * and that is why we need to use Object.assign.
 */
export class Stater<T extends fromRootModels.Entity, S extends fromRootModels.EntitiesState<T>> {
  add(
    state: S,
    addIds: number[],
    addEntities: { [id: number]: T },
    additionals?: { [prop: string]: any }
  ): S {
    const newAddIds: number[] = addIds.filter((id: number) => !state.ids.includes(id));
    const ids: number[] = [...state.ids, ...newAddIds];
    const entities: { [id: number]: T } = { ...state.entities, ...addEntities };

    return Object.assign({}, state, { ids, entities, ...additionals });
  }

  remove(state: S, removeIds: number[], additionals?: { [prop: string]: any }): S {
    const ids: number[] = state.ids.filter((id: number) => !removeIds.includes(id));
    const iteratedEntities: { [prop: number]: any }[] = this.getIteratedEntities(
      ids,
      state.entities
    );
    const entities: { [prop: number]: any } = this.foldIteratedEntities(iteratedEntities);

    return Object.assign({}, state, { ids, entities, ...additionals });
  }

  update(state: S, updateEntities: { [id: number]: T }, additionals?: { [prop: string]: any }): S {
    return Object.assign({}, state, { ...updateEntities, ...additionals });
  }

  private foldIteratedEntities(arr: { [prop: number]: any }[]): { [prop: number]: any } {
    return arr.reduce((acc, curr) => {
      return {
        ...acc,
        ...curr
      };
    }, arr[0]);
  }

  private getIteratedEntities(
    ids: number[],
    entities: { [id: number]: T }
  ): { [prop: number]: any }[] {
    return ids.map((id: number) => {
      return {
        [id]: entities[id]
      };
    });
  }
}
