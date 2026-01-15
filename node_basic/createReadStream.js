const { error } = require('console');
const fs = require('fs');
const readStream = fs.createReadStream('./readme2.txt', { highWaterMark: 16});
// createReadStream(): 파일을 작은 조각 단위로 읽어오는 스트림 생성
// 'highWaterMark: 16' -> 16바이트씩 끊어서 데이터 전송

const data = [];
readStream.on('data', (chunk) => {
    data.push(chunk);
    console.log('data: ', chunk, chunk.length);
});

readStream.on('end', () => { // 파일 읽기가 모두 끝났을 때 한 번만 실행
    console.log('end: ', Buffer.concat(data).toString());
});

readStream.on('error', () => {
    console.log('error: ', err);
});

// Stream은 큰 파일도 나눠서 처리하므로
// Buffer에 비해 메모리를 아낄 수 있다.
