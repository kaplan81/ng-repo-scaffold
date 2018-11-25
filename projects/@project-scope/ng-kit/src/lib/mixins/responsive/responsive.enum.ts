/**
 *  CSS media query breakpoints (based on Bootstrap).
 */
export enum KitBreakpoints {
  xs = 320,
  sm = 576,
  md = 768,
  lg = 992,
  xl = 1200
}
export type KitBreakpointsET = keyof typeof KitBreakpoints;

/**
 *  CSS media query types.
 */
export enum KitQueryType {
  biggerThan,
  smallerThan
}
export type KitQueryTypeET = keyof typeof KitQueryType;
