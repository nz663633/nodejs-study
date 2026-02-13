const express = require('express');
const router = express.Router();
const { renderProfile, renderJoin, renderMain, renderHashtag } = require('../controllers/page');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

router.use((req, res, next) => { // 라우터와 뷰에서 공통으로 사용할 res.locals 변수 설정
    res.locals.user = req.user;
    res.locals.followerCount = req.user?.Followers?.length || 0;
    res.locals.followingCount = req.user?.Followings?.length || 0;
    res.locals.followingIdList = req.user?.Followings?.map(f => f.id) || [];
    next();
});

// controller로 분리해서 작성
router.get('/profile', isLoggedIn, renderProfile);
router.get('/join', isNotLoggedIn, renderJoin);
router.get('/', renderMain);
router.get('/hashtag', renderHashtag); // hashtag?hashtag=고양이

module.exports = router;