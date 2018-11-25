import { Injectable, NgModule } from '@angular/core';
import { RouterEvent } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SubcribedContainerWithRouter } from '../../abstracts/container.abstract';

// Module to import in an app so that IDE does not complain.
@NgModule()
export class RouterEventsModule {}

/**
 * Assertion on all the different event types.
 */
@Injectable({
  providedIn: RouterEventsModule
})
export class RouterEventsService {
  filterRouterEvents(
    container: SubcribedContainerWithRouter,
    ...assertionEvents: any[]
  ): Observable<any> {
    if (assertionEvents.length === 0) {
      throw new Error('You must pass at least one router event type');
    }

    return container.router.events.pipe(
      filter((e: RouterEvent) => this.checkEvents(e, assertionEvents as RouterEvent[])),
      takeUntil(container.destroyed$)
    );
  }

  private checkEvents(event: RouterEvent, assertionEvents: RouterEvent[]): boolean {
    for (const assertionEvent of assertionEvents) {
      if (event instanceof (assertionEvent as any)) return true;
    }
    return false;
  }
}
