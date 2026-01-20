// 8080번 포트에서 서버를 실행하고
// 클라이언트의 요청 받아 응답을 보냄
// localhost:8080

const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.write('<p>Hello server</p>');
    res.end('<p>Hello Hyeonji</p>');
})
    .listen(8080); // 서버를 8080번 포트에서 실행(요청 받을 준비완료)

server.on('listening', () => {
    console.log('8080번 포트에서 대기 중입니다.');
});
server.on('error', (error) => {
    console.error(error);
});
