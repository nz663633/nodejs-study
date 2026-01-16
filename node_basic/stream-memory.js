// stream 방식: 파일을 chunk(조각) 단위로 읽어서 바로 처리
// → 메모리에 동시에 올라가는 데이터 양이 매우 적음

const fs = require('fs');

console.log('before:', process.memoryUsage().rss);

const readStream = fs.createReadStream('./big.txt'); 
// 파일을 조각 단위로 읽음 (기본 약 64KB)

const writeStream = fs.createWriteStream('./big3.txt');

readStream.pipe(writeStream);

readStream.on('end', () => {
  console.log('stream:', process.memoryUsage().rss);
});

// stream: chunk 단위 처리로 메모리 사용량이 거의 일정함
