import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KitTabContentComponent } from './tab-content/tab-content.component';
import { KitTabContentDirective } from './tab-content/tab-content.directive';
import { KitTabComponent } from './tab/tab.component';
import { KitTabsNavComponent } from './tabs-nav.component';
import { KitTabsComponent } from './tabs.component';

@NgModule({
  declarations: [
    KitTabsComponent,
    KitTabsNavComponent,
    KitTabComponent,
    KitTabContentComponent,
    KitTabContentDirective
  ],
  exports: [
    RouterModule,
    KitTabsComponent,
    KitTabsNavComponent,
    KitTabComponent,
    KitTabContentDirective
  ],
  imports: [CommonModule, RouterModule, PortalModule]
})
export class KitTabsModule {}
