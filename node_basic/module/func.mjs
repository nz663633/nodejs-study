// ES 모듈

import { odd, even } from './var.mjs';

function checkOddEven(num) {
    if (num % 2) { // 홀수이면
        return odd;
    }
    return even;
}

export default checkOddEven;