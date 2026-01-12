// URL은 노드 내장 객체이므로 require 생략가능
const url = require('url');

const { URL } = url;
const myURL = new URL('https://github.com/nz663633/nodejs-study');
console.log('new URL(): ', myURL);
console.log('url.format(): ', url.format(myURL));
// url.format(객체): 분해되었던 url 객체를 다시 원래 상태로 조립
