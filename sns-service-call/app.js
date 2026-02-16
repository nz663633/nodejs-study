const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

dotenv.config(); // .env 파일을 읽어서 process.env에 로드
// process.env.COOKIE_SECRET 있음, 사용가능(윗줄에서 불러옴)
const indexRouter = require('./routes');

const app = express();
app.set('port', process.env.PORT || 4000);
app.set('view engine', 'html');
nunjucks.configure('views', { // nunjucks 템플릿 엔진 설정(views 폴더 사용, 변경 실시간 감지)
    express: app,
    watch: true,
});

app.use(morgan('dev')); // 로깅(dev는 개발모드)
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

app.use('/', indexRouter);

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

