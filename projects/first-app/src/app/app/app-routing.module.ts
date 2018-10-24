import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as fromRootEnums from '@first-app/enums';

const redirectTo = `/${fromRootEnums.NavPrimaryPath.feature1}/${fromRootEnums.NavChildrenPath.entity1}`;

const routes: Routes = [
  {
    path: fromRootEnums.NavPrimaryPath.feature1,
    loadChildren: '../feature1/feature1.module#Feature1Module'
  },
  {
    path: fromRootEnums.NavPrimaryPath.wildcard,
    redirectTo
  }
];

@NgModule({
  // Uncomment the next to enable tracing and to see what events are happening during the navigation lifecycle.
  // imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
