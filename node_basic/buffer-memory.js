// buffer 방식: 파일 전체를 한 번에 메모리로 읽어와 처리
// → 대용량 파일일수록 메모리 사용량이 파일 크기만큼 증가함

const fs = require('fs');

console.log('before:', process.memoryUsage().rss);

const data = fs.readFileSync('./big.txt'); 
// 전체 파일을 한 번에 메모리(Buffer)에 올림

fs.writeFileSync('./big2.txt', data);

console.log('buffer:', process.memoryUsage().rss);

// buffer: 파일 전체를 메모리에 보관하므로 메모리 사용 비효율적
