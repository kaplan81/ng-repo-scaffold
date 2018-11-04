import { DebugElement, NgZone } from '@angular/core';
import { ComponentFixture, tick } from '@angular/core/testing';

/**
 * Insure that we are running functionality inside Angular's zone.
 * Useful e.g. for router.navigate.
 */
export function insureAngularZone(zone: NgZone, fn: () => any): any {
  return NgZone.isInAngularZone() ? fn() : zone.run(fn);
}

/**
 *  Wait a tick, then detect changes
 */
export function advance(f: ComponentFixture<any>): void {
  tick();
  f.detectChanges();
}

/**
 * Create custom DOM event the old fashioned way.
 * Although officially deprecated, some browsers (phantom) don't accept the preferred "new Event(eventName)".
 * See https://developer.mozilla.org/en-US/docs/Web/API/Event/initEvent
 */
export function newEvent(eventName: string, bubbles = false, cancelable = false) {
  const evt = document.createEvent('CustomEvent'); // MUST be 'CustomEvent'
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}

/**
 * Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler\
 * See https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
 */
export const ButtonClickEvents = {
  left: { button: 0 },
  right: { button: 2 }
};

/**
 * Simulate element click. Defaults to mouse left-button click event.
 */
export function click(
  el: DebugElement | HTMLElement,
  eventObj: any = ButtonClickEvents.left
): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}
