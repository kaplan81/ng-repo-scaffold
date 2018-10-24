import { Injectable } from '@angular/core';
import * as fromRootEnums from '@first-app/enums';
import * as fromRootModels from '@first-app/models';

/**
 * A very straightforward way of generating our feature navigations.
 * Only the public members are interesting to our final object.
 * Private properties are children of those and hang from them.
 * We cannot have those private properties as const variables since
 * we might also need to append, let us say, children to children.
 * That is also the main reason for creating this service class
 * instead of just making a constant out of a big
 * object literal containing all navigations.
 * For that we need a convenient binding to the `this` object.
 * Children navs need an `index` property since that object
 * needs to be converted to an array by the getChildren method.
 * Some values and types rely on enums imported from other files.
 * The generated properties can be used to navigate:
 * * Declaratively, e.g. with `[routerLink]` directive.
 * * Imperatively, e.g. with `Router.navigate()` method.
 * Final object will look like something like this:
 * {
    _entity1: {
      entity1: {
        link: {
          path: ['/', 'feature1', 'entity1'],
          text: 'entity1s'
        },
        index: null
      }
    },
    _entity2: {
      entity2: {
        link: {
          path: ['/', 'feature1', 'entity2'],
          text: 'entity2'
        },
        index: null
      }
    },
    _entity3: {
      entity3: {
        link: {
          path: ['/', 'feature1', 'entity3'],
          text: 'entity3s'
        },
        index: null
      }
    },
    feature1: {
      link: {
        path: ['/', 'feature1'],
        text: 'feature1'
      },
      children: {
        entity1: {
          link: {
            path: ['/', 'feature1', 'entity1'],
            text: 'entity1s'
          },
          index: 0
        },
        entity2: {
          link: {
            path: ['/', 'feature1', 'entity2'],
            text: 'entity2'
          },
          index: 1
        },
        entity3: {
          link: {
            path: ['/', 'feature1', 'entity3'],
            text: 'entity3s'
          },
          index: 2
        }
      }
    }
    // [...]
  };
 */
@Injectable({
  providedIn: 'root'
})
export class NavService {
  /**
   * The underscore convention to name private members
   * is used here as an exception for traceability
   * and because of the already mentioned reasons.
   */
  feature1: fromRootModels.Feature1;
  private _entity1: fromRootModels.ChildrenNavs;
  private _entity2: fromRootModels.ChildrenNavs;
  private _entity3: fromRootModels.ChildrenNavs;

  constructor() {
    // Set feature1 navs
    const feature1: fromRootModels.Nav = this.setPrimaryNav('feature1');
    this._entity1 = this.setChildrenNav(feature1, 'entity1');
    this._entity2 = this.setChildrenNav(feature1, 'entity2');
    this._entity3 = this.setChildrenNav(feature1, 'entity3');
    this.feature1 = this.addChildrenNavs(
      feature1,
      this._entity1,
      this._entity2,
      this._entity3
    ) as fromRootModels.Feature1;
  }

  /**
   * Get children navs in the form of an array.
   * This array will be arranged following the child index property.
   */
  getChildren(children: fromRootModels.ChildrenNavs): fromRootModels.Link[] {
    const iterable = {
      children,
      [Symbol.iterator]() {
        let index = 0;
        const childrenVals: fromRootModels.ChildNav[] = Object.values(children);
        return {
          next() {
            if (index < childrenVals.length) {
              const child: fromRootModels.ChildNav = childrenVals.find(
                (val: fromRootModels.ChildNav) => val.index === index
              );
              if (child === undefined) {
                throw Error('Children are wrong indexed.');
              }
              const value: fromRootModels.Link = {
                path: child.link.path,
                text: child.link.text
              };
              index++;

              return {
                value,
                done: false
              };
            } else {
              return {
                value: undefined,
                done: true
              };
            }
          }
        };
      }
    };

    return Array.from(iterable);
  }

  /**
   * Get url from path.
   */
  getUrl(path: fromRootModels.Path): string {
    const segments = path.filter(pathEl => typeof pathEl === 'string' && pathEl !== '/');

    return '/' + segments.join('/');
  }

  /**
   * Add children navs to a parent if it does not have children yet.
   * Child navs are automatically indexed in the order that they are provided as arguments.
   */
  private addChildrenNavs(
    parent: fromRootModels.Nav,
    ...childrenArgs: fromRootModels.ChildrenNavs[]
  ): fromRootModels.PrimaryNav | fromRootModels.ChildrenNav {
    if (parent.children) {
      throw Error('addChildrenNavs method can only be called once on each parent nav.');
    }
    const children: fromRootModels.ChildrenNavs = childrenArgs.reduce(
      (acc: fromRootModels.ChildrenNavs, curr: fromRootModels.ChildrenNavs, index: number) => {
        if (Object.keys(curr).length > 1) {
          throw Error('Each child must have only one keyed property.');
        }
        const firstCurrKey = Object.keys(curr)[0];
        const firstCurrKeyObj = curr[firstCurrKey];
        const indexedCurr = {
          [firstCurrKey]: { ...firstCurrKeyObj, index }
        };

        return {
          ...acc,
          ...indexedCurr
        };
      },
      childrenArgs[0]
    );

    return { ...parent, children };
  }

  private setChildrenNav(
    parent: fromRootModels.Nav,
    key: fromRootEnums.NavChildrenPathET
  ): fromRootModels.ChildrenNavs {
    const childPath = fromRootEnums.NavChildrenPath[key];
    const text = fromRootEnums.NavText[key];

    return this.setNav([...parent.link.path, childPath], text, key);
  }

  /**
   * Set a generic nav without children.
   * It can be either a parent nav or a children nav.
   */
  private setNav(path: fromRootModels.NavPath[], text: fromRootEnums.NavText): fromRootModels.Nav;
  private setNav(
    path: fromRootModels.NavPath[],
    text: fromRootEnums.NavText,
    key: fromRootEnums.NavChildrenPathET
  ): fromRootModels.ChildrenNavs;
  private setNav(
    path: fromRootModels.NavPath[],
    text: fromRootEnums.NavText,
    key?: fromRootEnums.NavChildrenPathET
  ): fromRootModels.Nav | fromRootModels.ChildrenNavs {
    const link: fromRootModels.Link = { path, text };
    let nav: fromRootModels.Nav | fromRootModels.ChildrenNavs = { link };
    // This means that it belongs to children navs.
    // Child nav index is set to null since it has not been added to any parent yet.
    if (key) {
      nav = { [key]: { ...nav, index: null } };
    }

    return nav;
  }

  /**
   * Set a primary nav without children.
   */
  private setPrimaryNav(key: fromRootEnums.NavPrimaryPathET): fromRootModels.Nav {
    return this.setNav(
      [fromRootEnums.NavPrimaryPath.root, fromRootEnums.NavPrimaryPath[key]],
      fromRootEnums.NavText[key]
    );
  }
}
