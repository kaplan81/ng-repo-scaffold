/* tslint:disable:no-unused-variable */
import { PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { AfterContentInit, Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentSuite, ComponentSuiteElements } from '@project-scope/test-kit';
import { KitTabContentComponent } from './tab-content.component';

// bascic case
@Component({
  template: `
    <ng-template>Tab Content</ng-template>
    <kit-tab-content [content]="content"></kit-tab-content>
  `
})
class BasicTabContentTestApp implements AfterContentInit {
  @ViewChild(TemplateRef)
  templateRef: TemplateRef<any>;

  content: TemplatePortal;

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngAfterContentInit() {
    this.content = new TemplatePortal(this.templateRef, this.viewContainerRef);
  }
}

describe('KitTabContentComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PortalModule],
      declarations: [KitTabContentComponent, BasicTabContentTestApp]
    }).compileComponents();
  }));

  describe('basic case', () => {
    let fixture: ComponentFixture<BasicTabContentTestApp>;
    let els: ComponentSuiteElements<BasicTabContentTestApp, KitTabContentComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(BasicTabContentTestApp);
      els = new ComponentSuite<BasicTabContentTestApp, KitTabContentComponent>(
        fixture,
        'kit-tab-content'
      ).elements;
    });

    it('should match snapshot', () => {
      fixture.detectChanges();

      expect(fixture).toMatchSnapshot();
    });

    it('should render content from external template', () => {
      fixture.detectChanges();

      const externalContent: TemplatePortal = els.host.component.content;
      const tabContent: TemplatePortal = els.nested.component.content;

      expect(externalContent).toBe(tabContent);
    });
  });
});
