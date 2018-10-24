import * as fromRootModels from '@first-app/models';

/**
 * For feature selectors.
 * To get any entities in the shape of an array.
 */
export function getSortedEntities<T extends fromRootModels.Entity>(
  ids: number[],
  entities: { [id: number]: T }
): T[] {
  return ids.map(id => entities[id]);
}
