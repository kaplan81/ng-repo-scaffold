import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '@first-app-core/core.module';
import { environment } from '@first-app-environments/environment';
import { AppRoutingModule } from '@first-app/app-routing.module';
// import * as fromRootComponents from '@first-app/components';
import * as fromRootContainers from '@first-app/containers';
import { CustomSerializer, effects, reducers } from '@first-app/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { MetaReducer, StoreModule } from '@ngrx/store';
// Not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];

@NgModule({
  // declarations: [...fromRootContainers.containers, ...fromComponents.components],
  declarations: [...fromRootContainers.containers],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  bootstrap: [fromRootContainers.AppComponent]
})
export class AppModule {}
