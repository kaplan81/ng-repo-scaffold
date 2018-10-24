import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { filter, map, pairwise, takeUntil } from 'rxjs/operators';
import { SubcribedContainer } from '../abstracts/container.abstract';
import { ScrollPosition } from './infinite-scroll.model';

@Directive({
  selector: '[kitInfiniteScroll]'
})
export class KitInfiniteScrollDirective extends SubcribedContainer implements AfterViewInit {
  @Input()
  currentPage = 1;
  @Input()
  loading = true;
  @Input()
  scrollPercent = 85;
  @Input()
  totalPages = 1;
  @Input()
  useWindow = true;
  @Output()
  nextPage = new EventEmitter<number>();

  get onScroll$(): Observable<Document | HTMLElement> {
    return this.scroll$.asObservable();
  }

  private scroll$ = new Subject<Document | HTMLElement>();

  constructor(private elementRef: ElementRef, private eventManager: EventManager) {
    super();
  }

  ngAfterViewInit() {
    this.addScrollEvent();
    this.onScroll$
      .pipe(
        map((e: Document | HTMLElement) => this.getScrollPosition(e)),
        pairwise(),
        filter((positions: [ScrollPosition, ScrollPosition]) => this.filterScroll(positions)),
        takeUntil(this.destroyed$)
      )
      .subscribe(() => this.nextPage.emit(++this.currentPage));
  }

  private addScrollEvent(): Function {
    return this.useWindow
      ? this.eventManager.addGlobalEventListener('window', 'scroll', (e: UIEvent) =>
          this.onScroll(e)
        )
      : this.eventManager.addEventListener(this.elementRef.nativeElement, 'scroll', (e: UIEvent) =>
          this.onScroll(e)
        );
  }

  private filterScroll(positions: [ScrollPosition, ScrollPosition]): boolean {
    return (
      this.scrollingDown(positions) &&
      this.overscrolled(positions[1]) &&
      this.inPageRange() &&
      this.notLoading()
    );
  }

  private getScrollPosition(event: Document | HTMLElement): ScrollPosition {
    const position: ScrollPosition = this.useWindow
      ? {
          scrollHeight: (event as Document).scrollingElement.scrollHeight,
          scrollTop: (event as Document).scrollingElement.scrollTop,
          contentHeight: (event as Document).documentElement.clientHeight
        }
      : {
          scrollHeight: (event as HTMLElement).scrollHeight,
          scrollTop: (event as HTMLElement).scrollTop,
          contentHeight: (event as HTMLElement).offsetHeight
        };

    return position;
  }

  private inPageRange(): boolean {
    return this.currentPage < this.totalPages;
  }

  private notLoading(): boolean {
    return !this.loading;
  }

  private scrollingDown(positions: [ScrollPosition, ScrollPosition]): boolean {
    return positions[0].scrollTop < positions[1].scrollTop;
  }

  private onScroll(event: UIEvent): void {
    this.scroll$.next(<Document | HTMLElement>event.target);
  }

  private overscrolled(position: ScrollPosition): boolean {
    return (
      (position.scrollTop + position.contentHeight) / position.scrollHeight >
      this.scrollPercent / 100
    );
  }
}
