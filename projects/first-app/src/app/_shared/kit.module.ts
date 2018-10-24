import { NgModule } from '@angular/core';
import { KitInfiniteScrollModule, KitTabsModule } from '@project-scope/ng-kit';

@NgModule({
  imports: [KitInfiniteScrollModule, KitTabsModule],
  exports: [KitInfiniteScrollModule, KitTabsModule]
})
export class KitModule {}
