const User = require('../models/user');
const bcrypt = require('bcrypt');

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

exports.login = () => {

}

exports.logout = () => {

}