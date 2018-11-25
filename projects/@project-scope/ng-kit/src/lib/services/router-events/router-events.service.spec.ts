/* tslint:disable:no-unused-variable */
import { Component, NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { insureAngularZone } from '@project-scope/test-kit';
import { SubcribedContainerWithRouter } from '../../abstracts/container.abstract';
import { RouterEventsService } from './router-events.service';

@Component({ selector: 'kit-routed', template: '' })
class RoutedTestComponent extends SubcribedContainerWithRouter {
  constructor(public router: Router) {
    super(router);
  }
}

describe('RouterEventsService', () => {
  let routerEventsService: RouterEventsService;
  let ngZone: NgZone;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoutedTestComponent],
      imports: [
        RouterTestingModule.withRoutes([{ path: 'routed', component: RoutedTestComponent }])
      ],
      providers: [RouterEventsService]
    })
      .compileComponents()
      .then(() => {
        routerEventsService = TestBed.get(RouterEventsService);
        ngZone = TestBed.get(NgZone);
        router = TestBed.get(Router);
      });
  });

  it('can be instantiated via DI', () => {
    expect(routerEventsService instanceof RouterEventsService).toBe(true);
  });

  describe('filterRouterEvents', () => {
    it('should throw error if no router event types are passed', () => {
      function filterWithoutEvents() {
        return routerEventsService.filterRouterEvents(new RoutedTestComponent(router));
      }

      expect(filterWithoutEvents).toThrowError();
    });

    it('should return an observable with the filtered router events', (done: any) => {
      let filteredEvents: any[] = [];

      routerEventsService
        .filterRouterEvents(new RoutedTestComponent(router), NavigationStart, NavigationEnd)
        .subscribe((filteredEvent: RouterEvent) => {
          filteredEvents = [...filteredEvents, filteredEvent];
          expect(filteredEvent).toBeInstanceOf(RouterEvent);
        });

      expect(filteredEvents.length).toBe(0);

      insureAngularZone(ngZone, () => {
        router.navigate(['/', 'routed']).then(() => {
          expect(filteredEvents.length).toBe(2);
          expect(filteredEvents[0].navigationTrigger).toBe('imperative');
          expect(filteredEvents[1].urlAfterRedirects).toBe('/routed');
          done();
        });
      });
    });
  });
});
