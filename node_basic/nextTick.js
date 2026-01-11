// setImmediate, setTimeout보다 promise와 nextTick이 먼저 실행됨

setImmediate(() => {
    console.log('immediate');
});

process.nextTick(() => {
    console.log('nextTick');
});

setTimeout(() => { // 대신해서 setImmediate를 사용할 것
    console.log('timeout');
}, 0);

Promise.resolve().then(() =>
    console.log('promise')
);
