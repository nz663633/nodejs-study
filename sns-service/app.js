const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');
const { sequelize } = require('./models'); // db 객체 안에 있는 sequelize 연결

dotenv.config(); // .env 파일을 읽어서 process.env에 로드
// process.env.COOKIE_SECRET 있음, 사용가능(윗줄에서 불러옴)
const pageRouter = require('./routes/page'); // 페이지 불러오기
const authRouter = require('./routes/auth');
const passportConfig = require('./passport');
const { watch } = require('fs');

const app = express();
passportConfig();
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('views', { // nunjucks 템플릿 엔진 설정(views 폴더 사용, 변경 실시간 감지)
    express: app,
    watch: true,
});

sequelize.sync() // 시퀄라이즈 모델을 db 테이블과 동기화
    .then(() => {
        console.log('데이터베이스 연결 성공')
    })
    .catch((err) => {
        console.error(err);
    })

app.use(morgan('dev')); // 로깅(dev는 개발모드)
app.use(express.static(path.join(__dirname, 'public'))); // 프론트에서 public 폴더를 자유롭게 사용하도록 허용(정적 파일 제공 css, js, 이미지...)
app.use(express.json()); // req.body를 ajax json 요청 받을 수 있도록 함
app.use(express.urlencoded({ extended: false })); // req.body 생성, req.body 폼 요청 받을 수 있도록 함
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true, // js에서 cookie의 접근 막음(보안강화)
        secure: false, // https 적용 관련
    }
}));
// passport 미들웨어는 항상 express session 미들웨어 바로 아래에 넣어준다
app.use(passport.initialize()); // req.user, req.login, req.isAuthenticate, req.logout 생성
app.use(passport.session()); // connect.id라는 이름으로 세션 쿠키가 브라우저로 전송

app.use('/', pageRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => { // 404 NOT FOUND
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err: {}; // 개발모드일 경우만 에러 로그를 표시함
    res.status(err.status || 500);
    res.render('error'); // error.html
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});