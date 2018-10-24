import { NavigationExtras, Params } from '@angular/router';
import * as fromRootEnums from '@first-app/enums';

/**
 * Path is the link parameters array.
 * That is taken by the Angular router as a route instruction.
 * Taking it this way means that we will never be interested in
 * having it as type string | any[] and that the first element of
 * the array will alwasy be root ('/').
 */
// TODO: when Angular updates Typescript depencency to version 3
// `ng update --all` in order to be able to do something like this:
// export type Path = [string, NavigationExtras, Outlet, ...any[]];
export type Path = any[];
export type NavPath = fromRootEnums.NavPrimaryPath | fromRootEnums.NavChildrenPath;
export type PrimaryNav = Feature1 | Methods;

export interface NavRoute {
  path: Path;
  query?: Params;
  extras?: NavigationExtras;
  callback?: (value?: any) => any;
}

export interface Link extends NavRoute {
  path: NavPath[];
  text: string;
}

export interface Nav {
  link: Link;
  children?: ChildrenNavs;
}

export interface ChildNav extends Nav {
  index: number | null;
}

export interface ChildrenNavs {
  [key: string]: ChildNav;
}

export interface ChildrenNav extends Nav {
  children: ChildrenNavs;
}

export interface Feature1Children extends ChildrenNavs {
  entity1: ChildNav;
  entity2: ChildNav;
  entity3: ChildNav;
}

export interface Feature1 extends Nav {
  children: Feature1Children;
}

export interface Navs {
  feature1: Feature1;
}
