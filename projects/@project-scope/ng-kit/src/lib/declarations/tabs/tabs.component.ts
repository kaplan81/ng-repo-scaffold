import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { KitTabComponent } from './tab/tab.component';

@Component({
  selector: 'kit-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class KitTabsComponent implements AfterContentInit {
  @ContentChildren(KitTabComponent)
  tabs: QueryList<KitTabComponent>;

  @Output()
  readonly selectedIndexChange: EventEmitter<number> = new EventEmitter<number>();

  selectedIndex = 0;

  ngAfterContentInit() {
    this.tabs.forEach((tab: KitTabComponent, i: number) => {
      if (tab.isActive) this.selectedIndex = i;
    });
  }

  changeSelectedIndex(i: number): void {
    if (this.selectedIndex !== i) {
      this.selectedIndex = i;
      this.selectedIndexChange.emit(this.selectedIndex);
    }
  }
}
