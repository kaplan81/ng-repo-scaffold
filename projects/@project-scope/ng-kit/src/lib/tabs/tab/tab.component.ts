import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, ContentChild, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { KitTabContentDirective } from '../tab-content/tab-content.directive';

@Component({
  selector: 'kit-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class KitTabComponent implements OnInit {
  @Input()
  get isActive(): any {
    return this._isActive;
  }
  set isActive(value: any) {
    this._isActive = coerceBooleanProperty(value);
  }
  @Input()
  label = '';
  @ContentChild(KitTabContentDirective, { read: TemplateRef })
  templateContent: TemplateRef<any>;
  @ViewChild(TemplateRef)
  plainContent: TemplateRef<any>;

  private _isActive = false;
  private contentPortal: TemplatePortal;

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    this.contentPortal = new TemplatePortal(
      this.templateContent || this.plainContent,
      this.viewContainerRef
    );
  }

  get content(): TemplatePortal {
    return this.contentPortal;
  }
}
