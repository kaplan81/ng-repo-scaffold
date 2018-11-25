import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[kitTabContent]' })
export class KitTabContentDirective {
  constructor(public template: TemplateRef<any>) {}
}
