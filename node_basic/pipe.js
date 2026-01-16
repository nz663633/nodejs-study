const fs = require('fs');
const zlib= require('zlib'); // 파일 압축 스트림

const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 });
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./writeme4.txt');
// readStream.pipe(writeStream);

// pipe는 데이터를 연결해주는 역할
// readStream -> gzip 압축 -> writeStream
readStream.pipe(zlibStream).pipe(writeStream); // 확장자로 압축