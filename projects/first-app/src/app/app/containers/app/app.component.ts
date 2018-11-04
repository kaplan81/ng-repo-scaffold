import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as fromRootModels from '@first-app/models';
import * as fromRootServices from '@first-app/services';

@Component({
  selector: 'fst-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  links: fromRootModels.Link[];

  constructor(private navService: fromRootServices.NavService) {
    this.links = [this.navService.feature1.link];

    // Tracing navs here.
    // console.log('this.navService:::', this.navService);
  }
}
