// Node.js에서 child_process를 사용해 외부 프로세스(ex. Python) 실행
// spawn: 프로세스 바로 실행, 실시간으로 처리,
//        출력이 많거나 오래 실행되는 작업에 주로 사용
// exec: 쉘을 통해 명령어 하나 실행, 결과를 한 번에 모아서 반환,
//       짧은 쉘 명령에만 사용(버퍼 제한 O)

const spawn = require('child_process').spawn;

const process = spawn('python', ['test.py']);

process.stdout.on('data', function (data) {
    console.log(data.toString());
});

process.stderr.on('data', function (data) {
    console.error(data.toString());
});