const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.join = async (req, res, next) => {
    const { nick, email, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email } }); // 해당 이메일로 가입한 유저가 있는지 찾기
        if (exUser) { // 해당 이메일을 가진 유저가 존재한다면?
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12); // bcrypt로 비밀번호 암호화
        await User.create({
            email,
            nick,
            password: hash,
        });
        return res.redirect('/'); // 302
    } catch (error) {
        console.error(error);
        next(error);
    }
}

// POST /auth/login
exports.login = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => { // localStrategy에서 done이 실행됐을 때
        if (authError) { // 서버실패
            console.error(authError);
            next(authError);
        }
        if (!user) { // 로직실패
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => { // 로그인 성공
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        })
    }) (req, res, next);
};

exports.logout = (req, res, next) => {
    req.logout(() => {
        res.redirect('/');
    })
};