/* eslint-disable @typescript-eslint/no-explicit-any */
type fn = (...args: any[]) => void;

export function debounce(fn: fn, wait: number) {
  let timer: number;
  return function (...args: any[]) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      return fn(...args);
    }, wait);
  };
}
