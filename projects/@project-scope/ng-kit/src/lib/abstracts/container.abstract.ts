import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export abstract class SubcribedContainer implements OnDestroy {
  destroyed$ = new Subject<boolean>();
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
