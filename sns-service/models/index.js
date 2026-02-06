const Sequelize = require('sequelize');
const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag'); // 모델들 불러오기
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env]; // 설정 불러오기
const db = {};
const sequelize = new Sequelize( // 시퀄라이즈 연결
  config.database, config.username, config.password, config,
);

// 각 모델들 db 객체에 넣어두기
db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag; 

// 각 모델의 테이블 구조를 시퀄라이즈에 등록
User.initiate(sequelize);
Post.initiate(sequelize);
Hashtag.initiate(sequelize);

// 각 테이블 관계 설정
User.associate(db);
Post.associate(db);
Hashtag.associate(db);

module.exports = db; // db 객체에 모아둔 모델들과 시퀄라이즈 한 번에 exports 하기