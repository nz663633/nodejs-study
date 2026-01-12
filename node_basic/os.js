// os는 운영체제에 대한 정보를 가져옴

const os = require('os');

console.log(os.cpus()); // cpu의 정보를 보여줌
console.log(os.uptime()); // 운영체제 부팅 이후 흐른 시간(초)를 보여줌
// process.uptime()은 노드의 실행 시간