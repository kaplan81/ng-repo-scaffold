import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export interface ComponentSuiteElements<H, N = any> {
  host: ComponentTestingElement<H>;
  nested?: ComponentTestingElement<N>;
}

export interface ComponentTestingElement<T> {
  component: T;
  debugEl: DebugElement;
  nativeEl: Element | HTMLElement;
}

export class ComponentSuite<H, N = any> {
  elements: ComponentSuiteElements<H, N>;

  constructor(private fixture: ComponentFixture<H>, private selector?: string) {
    this.setElements();
  }

  private getHost(): ComponentTestingElement<H> {
    const component: H = this.fixture.componentInstance;
    const debugEl: DebugElement = this.fixture.debugElement;
    const nativeEl: Element | HTMLElement = debugEl.nativeElement;

    return { component, debugEl, nativeEl };
  }

  private getIntegrationElements(): ComponentSuiteElements<H, N> {
    const host: ComponentTestingElement<H> = this.getHost();
    const nested: ComponentTestingElement<N> = this.getNested(host.debugEl);

    return {
      host,
      nested
    };
  }

  private getNested(hostDebugEl: DebugElement): ComponentTestingElement<N> {
    const debugEl: DebugElement = hostDebugEl.query(By.css(this.selector));
    const component: N = debugEl.componentInstance;
    const nativeEl: Element | HTMLElement = debugEl.nativeElement;

    return { component, debugEl, nativeEl };
  }

  private getShallowElements(): ComponentSuiteElements<H> {
    return { host: this.getHost() };
  }

  private setElements(): void {
    if (this.selector) {
      this.elements = this.getIntegrationElements();
    } else {
      this.elements = this.getShallowElements();
    }
  }
}
