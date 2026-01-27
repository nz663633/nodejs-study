// 개발 환경에서는 주로 nodemon으로 서버 실행

const express = require('express');
const path = require('path');
const morgan = require('morgan'); // 서버로 들어온 요청과 응답을 기록
const cookieParser = require('cookie-parser'); // 요청 헤더의 쿠키를 해석
const session = require('express-session'); // 세션 관리용 미들웨어
const app = express();

app.set('port', process.env.PORT || 3000); // 전역변수처럼 접근 가능
// 'port' : 키 역할
// process.env.PORT || 3000 : 값 역할
// process.env.PORT : 서버 환경에서 미리 정해준 포트 번호

// 미들웨어 간에 순서 중요
app.use(morgan('combined')); // dev보다 더 자세한 기록을 보여줌
app.use('/', express.static(path.join(__dirname, 'public'))); // 정적 파일 전용 미들웨어
app.use(express.json()); // JSON 요청 바디 파싱
app.use(express.urlencoded({ extended: true })); // HTML form 전송 데이터 파싱(파일이나 이미지 X)
app.use(cookieParser('hyeonjiPassword')); // 알아서 cookie를 파싱해줌(괄호에는 암호삽입)
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: hyeonjiPassword,
    cookie: {
        httpOnly: true
    },
    name: 'connect.sid'
}));
app.use('/', (req, res, next) => { // 미들웨어 확장
    if (req.session.id) {
        express.static(path.join(__dirname, 'public'))(req, res, next)
    } else { // 다음 미들웨어로 넘어가기
        next();
    }
});

const multer = require('multer');
const fs = require('fs');

// 서버 시작 전에 Sync 사용가능
try { // uploads 폴더 유무 확인
    fs.readdirSync('uploads');
} catch (error) { // 없으면 직접 생성(multer는 폴더를 자동으로 만들어주지 않기 때문)
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({ // 어디에 어떻게 어떤 이름으로 저장할지 정하는 함수
    storage: multer.diskStorage({ // 파일을 서버 디스크에 저장
        destination(req, file, done) {
            done(null, 'uploads/'); // done(에러, 경로) -> 에러는 없으니깐 null
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname); // 파일의 확장자 추출
            done(null, path.basename(file.originalname, ext) + Date.now() + ext); // 원래 이름 + 현재 시간 -> 파일명 중복 방지
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 최대 파일 크기 5MB(초과시 자동으로 에러 발생)
});

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
});
app.post('/upload', upload.single('image'), (req, res) => { // name="image"인 파일 1개 처리
    console.log(req.file); // multer가 처리한 image 파일의 정보 객체가 req.file에 들어있음
    console.log(req.body.title); // form에서 보낸 title을 req.body.title에 저장
    res.send('ok');
});

app.get('/', (req, res) => {
    req.cookies // { mycookie: 'test' }
    req.signedCookies; // 암호화된 쿠키
    res.cookie('name', encodeURIComponent(name), {
        expires: new Date(),
        httpOnly: true,
        path: '/',
    })
    res.clearCookie('name', encodeURIComponent(name), {
        httpOnly: true,
        path: '/',
    })
    req.body.name;
    res.sendFile(path.join(__dirname, './index.html'));
}, (req, res, next) => {
    next('route'); // 다음 라우터로 넘어감
}, (req, res) => {
    console.log('실행되나요?'); // 실행 안됨
});

app.get('/', (req, res, next) => { // next('route')로 인해 실행됨
    console.log('실행되지롱~');
    next();
})

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

app.use((req, res, next) => { // 404처리 미들웨어
    res.status(404).send('404지롱~')
});

app.use((err, req, res, next) => { // 에러처리 미들웨어(반드시 변수 4개!!!)
    console.error(err);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).end('에러났지롱~ 근데 안알려줄거라룽~')
});

app.listen(app.get('port'), () => { // 실제로 포트를 열어서 서버 시작
    console.log('익스프레스 서버 실행');
});