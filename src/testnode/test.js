/**
 * Created by mengmengchen on 17/9/21.
 */

import {People} from "./userSelect";

let p1 = new People();
let p2 = new People();

p1.name = 'cmm';
p1.age = 30;
console.log('********');
p1.say();
p2.say();
console.log('********');
p2.name = 'twf';
p2.age =33;
p1.say();
p2.say();
console.log('********');

class Guy {

  ['HELLO/WORLD'] () {
    console.log('hello world');
  }

}

let guy = new Guy();
guy['HELLO/WORLD']();