// 개발할 때 nodemon 서버를 더 자주 씀

const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000); // 전역변수처럼 접근 가능
// 'port' : 키 역할
// process.env.PORT || 3000 : 값 역할
// process.env.PORT : 서버 환경에서 미리 정해준 포트 번호

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/', (req, res) => { // if문을 쓰지 않아도 분기 처리됨
    res.send('hello express');
});

app.get('/about', (req, res) => {
    res.send('hello express');
});

app.listen(app.get('port'), () => { // 실제로 포트를 열어서 서버 시작
    console.log('익스프레스 서버 실행');
});