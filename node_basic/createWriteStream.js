const fs = require('fs');

const writeStream = fs.createWriteStream('./writeme2.txt');
writeStream.on('finish', () => { // finish는 모든 데이터가 정상적으로 기록된 후 발생
    console.log('파일 쓰기 완료');
});

writeStream.write('이 글을 씁니다.\n');
writeStream.write('한 번 더 씁니다.');
writeStream.end(); // writeStream 종료 (남은 버퍼를 기록한 뒤 finish 이벤트 발생)