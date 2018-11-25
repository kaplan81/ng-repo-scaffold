/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '@first-app/containers/app/app.component';
import * as fromRootServices from '@first-app/services';
import { ComponentSuite, ComponentSuiteElements } from '@project-scope/test-kit';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let els: ComponentSuiteElements<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule],
      providers: [fromRootServices.NavService]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        els = new ComponentSuite<AppComponent>(fixture).elements;
      });
  }));

  it('should create', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
