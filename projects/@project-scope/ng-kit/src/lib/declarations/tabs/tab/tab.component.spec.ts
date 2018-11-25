/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentSuite, ComponentSuiteElements } from '@project-scope/test-kit';
import { KitTabComponent } from './tab.component';

/**
 * For the moment leave this spec as shallow testing
 * since we have already tested its functionality
 * in integration with tabs.component.spec.ts.
 * Here we only check on the component creation.
 */
describe('KitTabComponent', () => {
  let fixture: ComponentFixture<KitTabComponent>;
  let els: ComponentSuiteElements<KitTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KitTabComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(KitTabComponent);
        els = new ComponentSuite<KitTabComponent>(fixture).elements;
      });
  }));

  it('should match snapshot', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
