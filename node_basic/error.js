// promise에는 항상 catch로 에러 처리하기

// uncaughtException은 에러 기록용, 복구 X
process.on('uncaughtException', (err) => {
    console.error('예기치 못한 에러', err);
});

setInterval(() =>{ // try-catch 없으므로 throw 에러 발생 -> uncaughtException으로 전달
    throw new Error('서버를 고장내주마~');
}, 1000);

setTimeout(() => {
    console.log('실행됩니다.');
}, 2000);

// 프로세스를 종료하지 않기 때문에
// 해당 코드 계속 반복됨, 1초마다 에러 로그 출력

// throw: 비정상 종료 + 상위로 전파
// return: 정상 종료