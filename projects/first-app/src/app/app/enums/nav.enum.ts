/**
 * Paths are shown in the URL.
 * Enum key and value can differ.
 */
export enum NavPrimaryPath {
  empty = '',
  root = '/',
  wildcard = '**',
  feature1 = 'feature1'
}
export type NavPrimaryPathET = keyof typeof NavPrimaryPath;

export enum NavChildrenPath {
  // feature1
  entity1 = 'entity1',
  entity2 = 'entity2',
  entity3 = 'entity3',
}
export type NavChildrenPathET = keyof typeof NavChildrenPath;

/**
 * Texts are shown in app views.
 * Enum key and value can differ.
 */
export enum NavText {
  // feature1
  feature1 = 'feature1',
  entity1 = 'entity1s',
  entity2 = 'entity2',
  entity3 = 'entity3s'
}
export type NavTextET = keyof typeof NavText;
