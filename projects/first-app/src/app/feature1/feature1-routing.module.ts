import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as fromFeature1Containers from '@first-app-feature1/containers';
import * as fromRootEnums from '@first-app/enums';

const redirectTo = `/${fromRootEnums.NavPrimaryPath.feature1}/${fromRootEnums.NavChildrenPath.entity1}`;

const routes: Routes = [
  {
    path: fromRootEnums.NavPrimaryPath.empty,
    redirectTo,
    pathMatch: 'full'
  },
  {
    path: fromRootEnums.NavPrimaryPath.empty,
    component: fromFeature1Containers.Feature1Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Feature1RoutingModule {}
