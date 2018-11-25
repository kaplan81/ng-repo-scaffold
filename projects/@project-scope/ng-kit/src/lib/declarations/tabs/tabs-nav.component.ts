import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { NavLink } from '../../models/nav.model';

@Component({
  selector: 'kit-tabs-nav',
  templateUrl: './tabs-nav.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class KitTabsNavComponent {
  @Input()
  navs: NavLink<any>[];

  constructor() {}

  label(nav: NavLink<any>): string {
    return nav.icon
      ? `<i class="material-icons nav-tab-icon">${nav.icon}</i>${nav.text}`
      : nav.text;
  }
}
