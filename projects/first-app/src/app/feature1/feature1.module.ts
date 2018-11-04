import { NgModule } from '@angular/core';
// import * as fromFeature1Components from '@first-app-feature1/components';
import * as fromFeature1Containers from '@first-app-feature1/containers';
import { Feature1RoutingModule } from '@first-app-feature1/feature1-routing.module';
import { effects, reducers } from '@first-app-feature1/store';
import { SharedModule } from '@first-app-shared/shared.module';
import * as fromRootStore from '@first-app/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    SharedModule,
    Feature1RoutingModule,
    StoreModule.forFeature(fromRootStore.featureStates.feature1, reducers),
    EffectsModule.forFeature(effects)
  ],
  // declarations: [...fromFeature1Containers.containers, ...fromFeature1Components.components],
  declarations: [...fromFeature1Containers.containers],
  exports: [fromFeature1Containers.Feature1Component]
})
export class Feature1Module {}
