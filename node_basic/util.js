// util: 디버깅, 비동기 처리 등을 돕는(편의 기능 모아둔) Node.js 유틸리티 모듈
// deprecated 라이브러리 생성할 때 주로 사용

const util = require('util');
const crypto = require('crypto');

const dontUseMe = util.deprecate((x, y) => {
    console.log(x + y);
}, 'dontUseMe 함수는 deprecated 되었으니 더 이상 사용하지 마세요!');
dontUseMe(1, 2);

const randomBytesPromise = util.promisify(crypto.randomBytes);
randomBytesPromise(64)
    .then((buf) => {
        console.log(buf.toString('base64'));
    })
    .catch((error) => {
        console.error(error);
    });

// util.deprecate(function, message): 함수가 deprecated 처리되었음을 알려줌
// 첫번째 인자로 넣은 함수를 사용했을 때 경고 메시지 출력
// 두번째 인자: 출력할 경고 메시지 내용 (경고 메시지는 한 번만 출력됨)
// deprecated: 더 이상 사용되지 않고 앞으로 사라지게 될 것(더 이상 사용하지 말라는 뜻)

// util.promisify(callback): 콜백 패턴을 promise 패턴으로 바꿔줌
