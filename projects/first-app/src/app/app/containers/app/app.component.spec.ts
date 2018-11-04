/* tslint:disable:no-unused-variable */
import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '@first-app/containers/app/app.component';
import * as fromRootModels from '@first-app/models';
import * as fromRootServices from '@first-app/services';
import {
  click,
  ComponentSuite,
  ComponentSuiteElements,
  RouterLinkStubDirective
} from '@project-scope/test-kit';

@Component({ selector: 'fst-first-nav', template: '' })
class FirstNavStubComponent {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let els: ComponentSuiteElements<AppComponent>;
  let navService: fromRootServices.NavService;
  let navLinks: fromRootModels.Link[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, FirstNavStubComponent, RouterLinkStubDirective],
      imports: [
        RouterTestingModule.withRoutes([{ path: 'feature1', component: FirstNavStubComponent }])
      ],
      providers: [fromRootServices.NavService]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        els = new ComponentSuite<AppComponent>(fixture).elements;
        navService = els.host.debugEl.injector.get(fromRootServices.NavService);
        navLinks = [navService.feature1.link];
      });
  }));

  it('should create', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should generate as many [routerLink] tags as links from NavService', () => {
    fixture.detectChanges();
    const routerEls: DebugElement[] = els.host.debugEl.queryAll(
      By.directive(RouterLinkStubDirective)
    );
    const routerLinks: number = routerEls.length;
    const links: number = navLinks.length;

    expect(routerLinks).toEqual(links);
  });

  it('[routerLink] tags should navigate correctly', () => {
    fixture.detectChanges();
    const routerEls: DebugElement[] = els.host.debugEl.queryAll(
      By.directive(RouterLinkStubDirective)
    );
    click(routerEls[0].nativeElement);
    const routerLinks = routerEls.map(de => de.injector.get(RouterLinkStubDirective));
    const navigatedTo: fromRootModels.NavPath[] = routerLinks[0].navigatedTo;
    const firstLink: fromRootModels.NavPath[] = navLinks[0].path;

    expect(navigatedTo).toEqual(firstLink);
  });
});
