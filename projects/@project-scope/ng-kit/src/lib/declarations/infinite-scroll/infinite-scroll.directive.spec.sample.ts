// import { Component } from '@angular/core';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { InfiniteScrollerDirective } from './infinite-scroller.directive';

// const SCROLL_TIMEOUT = 30;

// @Component({
//   styles: [`
//     div.window {
//       height: 100vh;
//     }
//     div.container {
//       height: 200px;
//       overflow: auto;
//     }
//     div p {
//       height: 100%;
//       margin: 0;
//     }
//   `],
//   template: `
//     <div
//       class="{{ useWindow ? 'window' : 'container' }}"
//       akInfiniteScroller
//       [useWindow]="useWindow"
//       [isLoading]="isLoading"
//       [scrollPercent]="70"
//       [initialPage]="page"
//       [totalPages]="totalPages"
//       (nextPage)="onNextPage($event)">
//       <p>a</p>
//       <p>b</p>
//     </div>`
// })
// class TestHostComponent {
//   page = 1;
//   totalPages = 5;
//   useWindow = true;
//   isLoading = false;

//   onNextPage = jasmine.createSpy('onNextPage');
// }

// // Scrolls element with time intervals to allow all events to be triggered
// function scrollElementAsync(scrollY: number, element = document.documentElement): Promise<void> {
//   return new Promise(resolve => {
//     element.scrollTo(0, scrollY);
//     window.setTimeout(resolve, SCROLL_TIMEOUT);
//   });
// }

// function getWindowScrollFromPercentage(percent: number) {
//   const scrollHeight = document.documentElement.scrollHeight;
//   const clientHeight = document.documentElement.clientHeight;
//   return Math.floor(((percent / 100) * scrollHeight) - clientHeight);
// }

// describe('InfiniteScrollerDirective', () => {
//   let fixture: ComponentFixture<TestHostComponent>;
//   let component: TestHostComponent;
//   let nativeEl: HTMLElement;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         TestHostComponent,
//         InfiniteScrollerDirective
//       ],
//     });
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(TestHostComponent);
//     component = fixture.componentInstance;
//     nativeEl = fixture.nativeElement;
//   });

//   describe('scrolling window ', () => {
//     beforeEach(() => {
//       fixture.detectChanges();
//     });

//     it('should trigger nextPage event when scroll exceeds limit', async () => {
//       await scrollElementAsync(getWindowScrollFromPercentage(50));
//       await scrollElementAsync(getWindowScrollFromPercentage(71));

//       expect(component.onNextPage).toHaveBeenCalledWith(2);
//     });

//     it('should NOT trigger event when scroll is not exceeding the limit', async () => {
//       console.log('start');
//       await scrollElementAsync(getWindowScrollFromPercentage(20));
//       await scrollElementAsync(getWindowScrollFromPercentage(60));
//       console.log('end');

//       expect(component.onNextPage).not.toHaveBeenCalled();
//     });

//     it('should NOT trigger event for the last page', async () => {
//       component.page = 5;
//       fixture.detectChanges();

//       await scrollElementAsync(getWindowScrollFromPercentage(50));
//       await scrollElementAsync(getWindowScrollFromPercentage(71));

//       expect(component.onNextPage).not.toHaveBeenCalled();
//     });

//     it('should NOT trigger other events while loading', async () => {
//       component.isLoading = true;
//       fixture.detectChanges();

//       await scrollElementAsync(getWindowScrollFromPercentage(50));
//       await scrollElementAsync(getWindowScrollFromPercentage(71));

//       expect(component.onNextPage).not.toHaveBeenCalled();
//     });

//   });

//   describe('scrolling container', () => {
//     beforeEach(() => {
//       component.useWindow = false;
//       fixture.detectChanges();
//     });

//     it('should trigger nextPage event for container scroll', async () => {
//       const div = nativeEl.querySelector('div');

//       await scrollElementAsync(100, div);
//       await scrollElementAsync(200, div);

//       expect(component.onNextPage).toHaveBeenCalledWith(2);
//     });

//   });

// });
