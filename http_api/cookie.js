// 쿠키: 키=값의 쌍
// 매 요청마다 서버에 동봉해서 보냄
// 쿠키는 부가적인 정보이므로 헤더에 저장(헤더는 데이터들의 데이터)

const http = require('http');

http.createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, { 'Set-cookie': 'mycookie=test'});
    res.end('Hello Cookie');
})
.listen(8083, () => {
    console.log('8083번 포트에서 서버 대기 중입니다!');
})