import { Directive, HostListener, Input, NgModule } from '@angular/core';

// export for convenience.
export { RouterLink } from '@angular/router';

@Directive({
  selector: '[routerLink]'
})
export class RouterLinkStubDirective {
  navigatedTo: any = null;
  @Input()
  routerLink: any;
  @HostListener('click')
  onClick() {
    this.navigatedTo = this.routerLink;
  }
}

@NgModule({
  declarations: [RouterLinkStubDirective]
})
export class RouterStubsModule {}
