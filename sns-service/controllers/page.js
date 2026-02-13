const Post = require('../models/post');
const User = require('../models/user');
const Hashtag = require('../models/hashtag');
const { where } = require('sequelize');

exports.renderProfile = (req, res, next) => {
    // 서비스를 호출
    res.render('profile', { title: '내 정보 - NodeBird' });
};
exports.renderJoin = (req, res, next) => {
    res.render('join', { title: '회원 가입 - NodeBird' });
};
exports.renderMain = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            include: {
                model: User,
                attributes: ['id', 'nick'], // 비밀번호는 프론트에 보내면 안되므로 적지 않음
            },
            order: [['createdAt', 'DESC']],
        })
        res.render('main', {
            title: 'NodeBird',
            twits: [],
        });
    } catch (error) {
        console.error(error);
        next(error);
    }

};

exports.renderHashtag = async (req, res, next) => {
    const query = req.query.hashtag;
    if (!query) {
        return res.redirect('/');
    }
    try {
        const hashtag = await Hashtag.findOne({ where: { title: query } });
        let posts = [];
        if (hashtag) { // 해시태그로 게시물 찾기
            posts = await hashtag.getPosts({
                include: [{ model: User, attributes: ['id', 'nick'] }],
                order: [['createdAt', 'DESC']] // 가장 최신 게시물 먼저
            });
        }
        res.render('main', { // 찾은 게시물 랜더링
            title: `${query} | NodeBird`,
            twits: posts,
        })
    } catch (error) {
        console.error(error);
    }
}

// 라우터 -> 컨트롤러 -> 서비스
// 컨트롤러는 요청, 응답이 명확
// 서비스는 요청, 응답이 불명확