/**
 * Created by mengmengchen on 17/9/22.
 */

export function add(...arg) {
  return (arg || []).reduce((x, y) => x + y, 0);
}

export function substract(x, y) {
  return x - y;
}

let o={}
Object.defineProperty(o, 'key', {
  enumerable: false,
  writable: false,
  configurable: true,
  value: 'name',
});

export function log(target, key, descriptor) {
  const method = descriptor.value;
  let ret;
  descriptor.value = (...args)=> {
    console.log(`${key} called`);
    ret = method.apply(target, args);
    return ret;
  };
  return descriptor;
}

