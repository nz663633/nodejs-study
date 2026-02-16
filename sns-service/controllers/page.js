const { User, Post, Hashtag } = require('../models');

exports.renderProfile = (req, res) => {
  res.render('profile', { title: '내 정보 - NodeBird' });
};

exports.renderJoin = (req, res) => {
  res.render('join', { title: '회원가입 - NodeBird' });
};

exports.renderMain = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ['id', 'nick'], // 비밀번호는 프론트에 보내면 안되므로 적지 않음
      },
      order: [['createdAt', 'DESC']], // 가장 최신 게시물 먼저
    });
    res.render('main', {
      title: 'NodeBird',
      twits: posts,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

exports.renderHashtag = async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect('/');
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) { // 해시태그로 게시물 찾기
      posts = await hashtag.getPosts({ include: [{ model: User }] });
    }

    return res.render('main', { // 찾은 게시물 렌더링
      title: `${query} | NodeBird`,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// 라우터 -> 컨트롤러 -> 서비스
// 컨트롤러는 요청, 응답이 명확
// 서비스는 요청, 응답이 불명확