import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'kit-tab-content',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class KitTabContentComponent {
  @Input()
  content: TemplatePortal;
}
