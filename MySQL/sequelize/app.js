// sequelize: node에서 MySQL같은 데이터베이스를 자바스크립트 코드처럼 다루게 해줌

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const { sequelize } = require('./models');
const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');

const app = express();
app.set('port', process.env.PORT || 3001);
app.set('view engine', 'html'); // 템플릿 엔진 확장자를 .html로 사용
nunjucks.configure('views', { // Nunjucks 설정(views 폴더에서 템플릿 찾기)
    express: app,
    watch: true,
});

// 데이터베이스 연결시키기(시퀄라이즈를 통해 node에서 MySQL 연결)
sequelize.sync({ force: false }) // force: false -> 테이블 삭제 안함(true일 경우 테이블 전부 삭제 후 재생성)
    .then(() => { // DB 연결 성공하면?
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => { // DB 연결 실패하면?
        console.error(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);

app.use((req, res, next) => { // 404 에러 처리
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => { // 서버 실행
    console.log(app.get('port'), '번 포트에서 대기 중');
});