const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email', // req.body.email
        passwordField: 'password', // req.body.password
        passReqToCallback: false
    }, async (email, password, done) => { // 유저의 로그인 가능여부 판단하기
        try {
            const exUser = await User.findOne({ where: { email } });
            if (exUser) { // email의 존재 유무 확인하기
                const result = await bcrypt.compare(password, exUser.password);
                if (result) { // 사용자가 입력한 비밀번호, db에 저장된 비밀번호가 같다면?
                    done(null, exUser); // done(서버실패, 성공유저, 로직실패)
                } else { // 로직실패했을 경우(서버에러 없음, 로그인 시켜줘야 할 때)
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.' })
                }
            } else {
                done(null, false, { message: '가입되지 않은 회원입니다.' })
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};