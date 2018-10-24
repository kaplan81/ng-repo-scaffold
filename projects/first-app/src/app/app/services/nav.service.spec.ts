/* tslint:disable:no-unused-variable */
import * as fromRootEnums from '@first-app/enums';
import * as fromRootModels from '@first-app/models';
import { NavService } from '@first-app/services/nav.service';

const primaryPaths: fromRootEnums.NavPrimaryPathET[] = [
  fromRootEnums.NavPrimaryPath[fromRootEnums.NavPrimaryPath.feature1]
];
const feature1ChildrenPaths: fromRootEnums.NavChildrenPathET[] = [
  fromRootEnums.NavChildrenPath[fromRootEnums.NavChildrenPath.entity1],
  fromRootEnums.NavChildrenPath[fromRootEnums.NavChildrenPath.entity2],
  fromRootEnums.NavChildrenPath[fromRootEnums.NavChildrenPath.entity3]
];

describe('NavService', () => {
  const navService = new NavService();

  it('can be instantiated via DI', () => {
    expect(navService instanceof NavService).toBe(true);
  });

  it('generates feature1 navigations', () => {
    const feature1Children: fromRootModels.Feature1Children = navService.feature1.children;
    const feature1ChildrenNavs: fromRootModels.Link[] = navService.getChildren(feature1Children);

    expect(feature1ChildrenNavs[0].path).toContain(primaryPaths[0]);
    expect(feature1ChildrenNavs[0].path).toContain(feature1ChildrenPaths[0]);
    expect(feature1ChildrenNavs[1].path).toContain(primaryPaths[0]);
    expect(feature1ChildrenNavs[1].path).toContain(feature1ChildrenPaths[1]);
    expect(feature1ChildrenNavs[2].path).toContain(primaryPaths[0]);
    expect(feature1ChildrenNavs[2].path).toContain(feature1ChildrenPaths[2]);
  });

  it('gets urls from paths', () => {
    const path: fromRootModels.Path = ['/', 'primary', 'child'];

    expect(navService.getUrl(path)).toMatch('/primary/child');
  });
});
