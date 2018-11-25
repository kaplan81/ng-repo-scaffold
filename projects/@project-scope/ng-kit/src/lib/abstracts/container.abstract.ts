import { OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

export abstract class SubcribedContainer implements OnDestroy {
  destroyed$ = new Subject<boolean>();
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

export abstract class SubcribedContainerWithRouter extends SubcribedContainer {
  constructor(public router: Router) {
    super();
  }
}
