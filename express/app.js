// 개발 환경에서는 주로 nodemon으로 서버 실행

const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000); // 전역변수처럼 접근 가능
// 'port' : 키 역할
// process.env.PORT || 3000 : 값 역할
// process.env.PORT : 서버 환경에서 미리 정해준 포트 번호

app.use('/', (req, res, next) => { // 미들웨어(요청과 응답 사이에서 공통 로직 처리)
    console.log('모든 요청에 실행하고 싶어요!');
    next(); // 다음 미들웨어 또는 라우트 핸들러로 요청을 넘김, 호출하지 않으면 응답 안 넘어감
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/', (req, res) => { // if문을 쓰지 않아도 분기 처리됨
    res.send('hello express');
});

app.get('/category/Javascript', (req, res) => {
    res.send(`hello Javascript`);
});

// 위에서 아래로 실행되므로 와일드 카드 매개변수는 마지막에 작성
app.get('/category/:name', (req, res) => { // 라우트 매개변수 사용(URL 경로의 일부를 변수처럼 받아옴)
    res.send(`hello ${req.params.name}`);
});

app.get('/about', (req, res) => {
    res.send('hello express');
});

app.listen(app.get('port'), () => { // 실제로 포트를 열어서 서버 시작
    console.log('익스프레스 서버 실행');
});