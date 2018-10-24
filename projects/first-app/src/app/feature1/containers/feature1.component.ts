import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as fromRootModels from '@first-app/models';
import * as fromRootServices from '@first-app/services';

// TODO: test feature1 components.
@Component({
  template: 'Feature 1 components here!',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Feature1Component {
  feature1Navs: fromRootModels.Link[];

  constructor(private navService: fromRootServices.NavService) {
    const feature1Children: fromRootModels.Feature1Children = this.navService.feature1.children;
    this.feature1Navs = navService.getChildren(feature1Children);
  }
}
