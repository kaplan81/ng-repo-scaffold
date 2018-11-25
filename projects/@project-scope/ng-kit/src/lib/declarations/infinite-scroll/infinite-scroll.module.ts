import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KitInfiniteScrollDirective } from './infinite-scroll.directive';

@NgModule({
  imports: [CommonModule],
  exports: [KitInfiniteScrollDirective],
  declarations: [KitInfiniteScrollDirective]
})
export class KitInfiniteScrollModule {}
