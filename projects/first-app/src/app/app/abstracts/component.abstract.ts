import { EventEmitter, Input, Output } from '@angular/core';

export abstract class LoadingComponent {
  @Input()
  loading: boolean;
}

export abstract class PagingComponent extends LoadingComponent {
  @Input()
  page: any;
  @Output()
  nextPage = new EventEmitter<number>();
  onNextPage(page: number): void {
    this.nextPage.emit(page);
  }
}
