const Post = require('../models/post');
const Hashtag = require('../models/hashtag');

exports.afterUploadImage = (req, res) => {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` }); // 업로드된 이미지의 url을 프론트로 보내주기
}

exports.uploadPost = async (req, res, next) => {
    // req.body.content, req.body.url
    // 해시태그 정규 표현식 -> /#[^\s#]*/g
    try {
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            UserId: req.user.id,
        });
        const hashtags = req.body.content.match(/#[^\s#]*/g);
        if (hashtags) {
            const result = await Promise.all(hashtags.map((tag) => {
                return Hashtag.findOrCreate({ // 기존 해시태그 있으면 찾고 없으면 생성하기
                    where: { title: tag.slice(1).toLowerCase() } // 해시태그에서 # 분리하기
                });
            }));
            console.log('result', result);
            await post.addHashtags(result.map(r => r[0]));
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
};