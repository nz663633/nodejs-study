// worker_threads 멀티 스레드 사용
const { stat } = require('fs');
const { start } = require('repl');
const { WASI } = require('wasi');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) { // 메인스레드
    const threads = new Set();
    threads.add(new Worker(__filename, { // 첫 번째 워커 생성
        workerData: { start: 1 }, // 워커에게 초기 데이터 전달
    }));
    threads.add(new Worker(__filename, { // 두 번째 워커 생성
        workerData: { start: 2 }, // 워커에게 초기 데이터 전달
    }));
    for (let worker of threads) {
        worker.on('message', (value) => console.log('워커로부터', value));
        worker.on('exit', () => {
            threads.delete(worker);
            if (threads.size === 0) {
                console.log('워커 끝~~');
            }
        });
    }
} else { // 워커스레드
    const data = workerData;
    parentPort.postMessage(data.start + 100);
}