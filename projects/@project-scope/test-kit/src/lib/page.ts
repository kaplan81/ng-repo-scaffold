/// <reference types="jest" />

import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

export class Page {
  private router: Router;

  constructor(
    private component: Component,
    private debugEl: DebugElement,
    private nativeEl: Element | HTMLElement
  ) {
    this.router = debugEl.injector.get(Router);
  }

  queryByAll<T>(): T[] {
    return <any>this.debugEl.query(By.all());
  }

  queryByCss<T>(selector: string): T {
    return <any>this.debugEl.query(By.css(selector));
  }

  queryAllByCss<T>(selector: string): T[] {
    return <any>this.debugEl.queryAll(By.css(selector));
  }

  queryByDirective<T>(directive: any): T {
    return <any>this.debugEl.query(By.directive(directive));
  }

  queryAllByDirective<T>(directive: any): T[] {
    return <any>this.debugEl.query(By.directive(directive));
  }

  spyOnMethod(method: string) {
    spyOn(this.component, <any>method);
  }

  spyOnMethodAndCallThrough(method: string) {
    spyOn(this.component, <any>method).and.callThrough();
  }
}
