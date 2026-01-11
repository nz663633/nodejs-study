// ES 모듈
// top level await 가능 (async없이 사용 가능)
// import는 반드시 최상단에 위치

import { odd, even } from './var.mjs';
import checkOddEven from './func.mjs';

function checkStringOddOrEven(str) {
    if (str.length % 2) { // 홀수이면
        return odd;    
    }
    return even;
}

console.log(checkOddEven(10));
console.log(checkStringOddOrEven('hello'));