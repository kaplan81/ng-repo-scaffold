// export for convenience.
export { ActivatedRoute } from '@angular/router';
import { convertToParamMap, Data, ParamMap, Params } from '@angular/router';
import { Observable, of, ReplaySubject } from 'rxjs';

export interface ActivatedRouteSnapshotStub {
  data?: Data;
  paramMap?: ParamMap;
}

export interface ActivatedRouteProps {
  initialData?: Data;
  initialSnapshot?: ActivatedRouteSnapshotStub;
  initialParams?: Params;
}

export class ActivatedRouteStub {
  data: Observable<Data>;
  snapshot: ActivatedRouteSnapshotStub;
  readonly paramMap: Observable<ParamMap>;
  // Use a ReplaySubject to share previous values with subscribers
  // and pump new values into the `paramMap` observable
  private subject = new ReplaySubject<ParamMap>();

  constructor(init: ActivatedRouteProps = {}) {
    this.paramMap = this.subject.asObservable();
    if (init.initialSnapshot) this.snapshot = init.initialSnapshot;
    if (init.initialData) {
      this.data = of(init.initialData);
      this.setParamMap(init.initialParams);
    }
  }

  setParamMap(params?: Params) {
    this.subject.next(convertToParamMap(params));
  }
}
