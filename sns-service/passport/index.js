const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => { // passport 설정
    passport.serializeUser((user, done) => { // user로부터
        done(null, user.id); // user.id만 꺼내서 저장
    });

    passport.deserializeUser((id, done) => {
        User.findOne({ where: { id } })
            .then((user) => done(null, user))
            .catch(err => done(err));
    });

    local(); // localStrategy 호출
}