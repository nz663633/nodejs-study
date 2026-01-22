// 기본적으로 싱글 스레드인 노드가 CPU 코어를 모두 사용할 수 있게 해주는 모듈
// cluster는 하나의 포트에 여러 개의 서버를 띄울 수 있게 해줌

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`마스터 프로세스 아이디: ${process.pid}`);
    // CPU 개수만큼 워커 프로세스를 생산
    for (let i = 0; i < numCPUs; i += 1) {
        cluster.fork(); // 새로운 워커 생성
    }
    // 워커가 종료되었을 때
    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
        console.log('code', code, 'signal', signal);
        cluster.fork(); // 새 워커를 생성해서 서버가 계속 살아있도록 유지
    });
} else {
    // 워커 프로세스들이 포트에서 대기(같은 포트 8086)
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Hello Node!</h1>');
        res.end('<p>Hello Cluster!</p>');
        setTimeout(() => { // 워커 존재를 확인하기 위해 1초마다 강제 종료
            process.exit(1);
        }, 1000);
    }).listen(8086);

    console.log(`${process.pid}번 워커 실행`);
}