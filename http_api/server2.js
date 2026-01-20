const http = require('http');
const fs = require('fs').promises;

const server = http.createServer(async (req, res) => {
    console.log('이 서버 파일 실행됨');
    console.log('요청 들어옴: ', req.url);
    try {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        const data = await fs.readFile('/server2.html');
        res.end(data);
    } catch (error) {
        console.error(err);
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(err.message);
    }
});

server.listen(8080); // 서버를 8080번 포트에서 실행(요청 받을 준비완료)

server.on('listening', () => {
    console.log('8080번 포트에서 대기 중입니다...');
});
server.on('error', (error) => {
    console.error(error);
});