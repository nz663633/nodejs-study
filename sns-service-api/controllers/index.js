const { UUID } = require('sequelize');
const { User, Domain } = require('../models');
const { v4: uuidv4 } = require('uuid');

exports.renderLogin = async (req, res, next) => { // 로그인 화면
    try {
        const user = await User.findOne({
            where: { id: req.user?.id || null }, // 내 아이디 찾기
            include: { model: Domain } // 내 도메인 찾기
        })
        res.render('login', {
            user,
            domains: user?.Domains,
        })
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.createDomain = async (req, res, next) => {
    try {
        await Domain.create({
            UserId: req.user.id,
            host: req.body.host,
            type: req.body.type,
            clientSecret: uuidv4()
        })
        res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
}

