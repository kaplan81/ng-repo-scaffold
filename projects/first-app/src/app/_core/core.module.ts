import { APP_INITIALIZER, NgModule, Optional, SkipSelf } from '@angular/core';
import { ConfigService } from '@first-app-core/config.service';
import { ConfigFileModule, ErrorModule } from '@project-scope/ng-kit';

export function appInitializerFactory(configService: ConfigService): Function {
  return () => configService.loadConfig().toPromise();
}

/**
 * CoreModule will mainly be in charge of implementing 2 things:
 * APP_INITIALIZER for our configuration file.
 * HTTP_INTERCEPTORS for our interceptors.
 *
 * It will also import ng-kit services in the shape of ng modules.
 */
@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [ConfigService],
      multi: true
    }
  ],
  imports: [ConfigFileModule, ErrorModule]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    // Prevent reimport of the CoreModule.
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule ONLY');
    }
  }
}
