const path = require('path');

console.log(path.join(__dirname, '/var.js'));
// 경로를 합쳐줌 => \nodejs-study\node_basic\var.js
// join은 '/'를 상대경로로 처리

console.log(path.join(__dirname, '..', '/var.js'));
// 경로를 합쳐줌 => \nodejs-study\var.js

console.log(path.resolve(__dirname, '..', '/var.js')); 
// \var.js
// resolve는 '/'를 절대경로로 처리