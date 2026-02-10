const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../middlewares')
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { afterUploadImage, uploadPost} = require('../controllers/post');

try {
    fs.readdirSync('uploads'); // uploads 폴더 유무 확인하기
} catch (error) {
    fs.mkdirSync('uploads');  // uploads 폴더 없으면 생성하기
}

const upload = multer({ // 이미지 업로드
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/'); // uploads 폴더에 저장
        },
        filename(req, file, cb) {
            console.log(file);
            const ext = path.extname(file.originalname); // 파일 확장자만 추출
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext) // 이미지20250210.png
        }
    }),
    limits: { fileSize: 20 * 1024 * 1024 },
});
router.post('/img', isLoggedIn, upload.single('img'), afterUploadImage);

const upload2 = multer({ // 게시글 업로드(img 필요없음)

});
router.post('/', isLoggedIn, upload2.none(), uploadPost);

module.exports = router;