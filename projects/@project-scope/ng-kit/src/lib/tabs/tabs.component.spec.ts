/* tslint:disable:no-unused-variable */
import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { click, ComponentSuite, ComponentSuiteElements } from '@project-scope/test-kit';
import { KitTabComponent } from './tab/tab.component';
import { KitTabsComponent } from './tabs.component';
import { KitTabsModule } from './tabs.module';

// bascic case
@Component({
  template: `
    <kit-tabs>
      <kit-tab label="Label 1">Content 1</kit-tab>
      <kit-tab label="Label 2">Content 2</kit-tab>
      <kit-tab label="Label 3">Content 3</kit-tab>
    </kit-tabs>
  `
})
class BasicTabsTestApp {}

// dynamic case
@Component({
  template: `
    <kit-tabs>
      <kit-tab *ngFor="let tab of tabs" label="tab.label">tab.content</kit-tab>
    </kit-tabs>
  `
})
class DynamicTabsTestApp {
  tabs = [
    { label: 'Label 1', content: 'Content 1' },
    { label: 'Label 2', content: 'Content 2' },
    { label: 'Label 3', content: 'Content 3' }
  ];
}

// with active tab
@Component({
  template: `
    <kit-tabs>
      <kit-tab label="Label 1">Content 1</kit-tab>
      <kit-tab label="Label 2" isActive>Content 2</kit-tab>
      <kit-tab label="Label 3">Content 3</kit-tab>
    </kit-tabs>
  `
})
class IsActiveTabsTestApp {}

// with selectedIndexChange event binding
@Component({
  template: `
    <kit-tabs (selectedIndexChange)="selectIndex($event)">
      <kit-tab label="Label 1">Content 1</kit-tab>
      <kit-tab label="Label 2">Content 2</kit-tab>
      <kit-tab label="Label 3">Content 3</kit-tab>
    </kit-tabs>
  `
})
class SelectedEventTabsTestApp {
  index: number = null;

  selectIndex(index: number): void {
    this.index = index;
  }
}

// with kitTabContent directive
@Component({
  template: `
    <kit-tabs>
      <kit-tab label="Label 1">{{plainContent}}</kit-tab>
      <kit-tab label="Label 2">
        <ng-template kitTabContent>
          {{templateContent}}
        </ng-template>
      </kit-tab>
      <kit-tab label="Label 3">Content 3</kit-tab>
    </kit-tabs>
  `
})
class ContentDirectiveTabsTestApp {
  plainContent = 'plain transcluded content!';
  templateContent = 'kitTabContent directive content!';
}

describe('KitTabsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [KitTabsModule],
      declarations: [
        BasicTabsTestApp,
        DynamicTabsTestApp,
        IsActiveTabsTestApp,
        SelectedEventTabsTestApp,
        ContentDirectiveTabsTestApp
      ]
    }).compileComponents();
  }));

  describe('basic case', () => {
    let fixture: ComponentFixture<BasicTabsTestApp>;
    let els: ComponentSuiteElements<BasicTabsTestApp, KitTabsComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(BasicTabsTestApp);
      els = new ComponentSuite<BasicTabsTestApp, KitTabsComponent>(fixture, 'kit-tabs').elements;
    });

    it('should match snapshot', () => {
      fixture.detectChanges();

      expect(fixture).toMatchSnapshot();
    });

    it('should generate as many labels as <kit-tab> tags are in the template', () => {
      fixture.detectChanges();

      const labels: number = els.nested.debugEl.queryAll(By.css('.kit-tabs__label')).length;
      const tabs: number = els.nested.component.tabs.toArray().length;

      expect(labels).toEqual(tabs);
    });

    it('should default to the first tab', () => {
      fixture.detectChanges();

      expect(els.nested.component.selectedIndex).toEqual(0);
    });

    it('should display only the active content', () => {
      fixture.detectChanges();

      const contents: number = els.nested.debugEl.queryAll(By.css('kit-tab-content')).length;

      expect(contents).toEqual(1);
    });

    it('should change selected index on click', () => {
      fixture.detectChanges();

      const secondLabel: DebugElement = els.nested.debugEl.queryAll(By.css('.kit-tabs__label'))[1];
      secondLabel.nativeElement.click();

      expect(els.nested.component.selectedIndex).toEqual(1);
    });
  });

  describe('dynamic case', () => {
    let fixture: ComponentFixture<DynamicTabsTestApp>;
    let els: ComponentSuiteElements<DynamicTabsTestApp, KitTabsComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(DynamicTabsTestApp);
      els = new ComponentSuite<DynamicTabsTestApp, KitTabsComponent>(fixture, 'kit-tabs').elements;
    });

    it('should match snapshot', () => {
      fixture.detectChanges();

      expect(fixture).toMatchSnapshot();
    });

    it('should generate as many labels as <kit-tab> tags are in the template', () => {
      fixture.detectChanges();

      const labels: number = els.nested.debugEl.queryAll(By.css('.kit-tabs__label')).length;
      const tabs: number = els.nested.component.tabs.toArray().length;

      expect(labels).toEqual(tabs);
    });
  });

  describe('with active tab', () => {
    let fixture: ComponentFixture<IsActiveTabsTestApp>;
    let els: ComponentSuiteElements<IsActiveTabsTestApp, KitTabsComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(IsActiveTabsTestApp);
      els = new ComponentSuite<IsActiveTabsTestApp, KitTabsComponent>(fixture, 'kit-tabs').elements;
    });

    it('should match snapshot', () => {
      fixture.detectChanges();

      expect(fixture).toMatchSnapshot();
    });

    it('should default to the another tab if isActive property is set on <kit-tab>', () => {
      fixture.detectChanges();

      const tabs: KitTabComponent[] = els.nested.component.tabs.toArray();
      const activeIndex: number = tabs.reverse().findIndex((tab: KitTabComponent) => tab.isActive);

      expect(els.nested.component.selectedIndex).toEqual(activeIndex);
    });
  });

  describe('with selectedIndexChange event binding', () => {
    let fixture: ComponentFixture<SelectedEventTabsTestApp>;
    let els: ComponentSuiteElements<SelectedEventTabsTestApp, KitTabsComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(SelectedEventTabsTestApp);
      els = new ComponentSuite<SelectedEventTabsTestApp, KitTabsComponent>(fixture, 'kit-tabs')
        .elements;
    });

    it('should match snapshot', () => {
      fixture.detectChanges();

      expect(fixture).toMatchSnapshot();
    });

    it('should select new index and emit it to the parent', () => {
      fixture.detectChanges();
      // This should be 0.
      const firstSelectedIndex: number = els.nested.component.selectedIndex;
      const labels: DebugElement[] = els.nested.debugEl.queryAll(By.css('.kit-tabs__label'));
      const newIndex = 1;
      // This changes the index
      click(labels[newIndex]);
      // This should be 1.
      const secondSelectedIndex: number = els.nested.component.selectedIndex;
      const parentIndex: number = els.host.component.index;

      expect(firstSelectedIndex).not.toEqual(secondSelectedIndex);
      expect(secondSelectedIndex).toEqual(newIndex);
      expect(parentIndex).toEqual(secondSelectedIndex);
    });
  });

  describe('with kitTabContent directive', () => {
    let fixture: ComponentFixture<ContentDirectiveTabsTestApp>;
    let els: ComponentSuiteElements<ContentDirectiveTabsTestApp, KitTabsComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(ContentDirectiveTabsTestApp);
      els = new ComponentSuite<ContentDirectiveTabsTestApp, KitTabsComponent>(fixture, 'kit-tabs')
        .elements;
    });

    it('should match snapshot', () => {
      fixture.detectChanges();

      expect(fixture).toMatchSnapshot();
    });

    it('should display explicit content if tab contains an <ng-template> with kitTabContent directive', () => {
      fixture.detectChanges();

      // First tab contains plain transcluded content and is selected by default.
      const plainContent: string = els.host.component.plainContent;
      const firstTabContent: DebugElement = els.nested.debugEl.query(By.css('kit-tab-content'));
      const firstTabContentHtml: string = firstTabContent.nativeElement.innerHTML;

      expect(firstTabContentHtml).toMatch(plainContent);

      const labels: DebugElement[] = els.nested.debugEl.queryAll(By.css('.kit-tabs__label'));
      // // This changes the index, selects the second tab.
      click(labels[1]);
      fixture.detectChanges();
      // Second tab contains an <ng-template> with kitTabContent directive
      // and it is not selected by default.
      const templateContent: string = els.host.component.templateContent;
      const secondTabContent: DebugElement = els.nested.debugEl.query(By.css('kit-tab-content'));
      const secondTabContentHtml: string = secondTabContent.nativeElement.innerHTML;

      expect(secondTabContentHtml).toMatch(templateContent);
    });
  });
});
