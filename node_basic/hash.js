// 단방향 암호화(crypto)
// 암호화(평문을 암호로 만듦) 가능, 복호화(암호를 평문으로 해독) 불가능
// ex. 해시(Hash) 기법: 평문을 고정 길이의 값으로 변환하는 단방향 함수


// 문자열(비밀번호)를 sha512 해시 알고리즘으로 단반향 변환 후 출력
// createHash(알고리즘): 사용할 해시 알고리즘 넣기 (ex. sha512, sha3, pbkdf2, scrypt)
// update(문자열): 변환할 문자열 넣기
// digest(인코딩): 인코딩할 알고리즘 넣기 (ex. base64, hex, latin1)
// 같은 입력은 항상 같은 해시값을 생성
const crypto = require('crypto');

console.log('base64: ', crypto.createHash('sha512').update('비밀번호').digest('base64'));
console.log('hex: ', crypto.createHash('sha512').update('비밀번호').digest('hex'));
console.log('base64: ', crypto.createHash('sha512').update('다른 비밀번호').digest('base64'));
