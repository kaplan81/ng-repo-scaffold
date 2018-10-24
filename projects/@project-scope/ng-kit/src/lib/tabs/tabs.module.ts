import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KitTabContentComponent } from './tab-content/tab-content.component';
import { KitTabContentDirective } from './tab-content/tab-content.directive';
import { KitTabComponent } from './tab/tab.component';
import { KitTabsComponent } from './tabs.component';

@NgModule({
  declarations: [KitTabsComponent, KitTabComponent, KitTabContentComponent, KitTabContentDirective],
  exports: [KitTabsComponent, KitTabComponent, KitTabContentDirective],
  imports: [CommonModule, PortalModule]
})
export class KitTabsModule {}
