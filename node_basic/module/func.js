// 선언하지 않았지만 노드에서 require() 제공
// require은 다른 파일(모듈)을 불러오고 그 파일의 module.exports를 반환
const { odd, even } = require('./var.js'); // 구조분해 할당

function checkOddOrEven(number) {
    if (number % 2) {
        return odd;
    } else {
        return even;
    }
}

// 이미 넘겨받은 변수를 또 넘겨줄 수 있다.
// module.exports는 파일에서 한 번만 사용해야 한다. 
module.exports = checkOddOrEven;