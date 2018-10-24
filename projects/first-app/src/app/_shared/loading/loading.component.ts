import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pref-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent {}
