import { SubcribedContainer } from '@project-scope/ng-kit';
import { Observable } from 'rxjs';

export abstract class LoadingContainer extends SubcribedContainer {
  abstract loading$: Observable<boolean>;
}

export abstract class PagingContainer extends LoadingContainer {
  abstract page$: Observable<any>;
  abstract onNextPage(pageNumber: number): void;
}
