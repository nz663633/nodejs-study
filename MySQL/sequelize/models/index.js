// MySQL, sequelize, node를 연결시켜주는 코드

const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {}; // 모델과 시퀄라이즈를 담을 객체

// 실제 MySQL 서버에 연결
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;

// 모델 초기화(테이블 연결)
User.initiate(sequelize);
Comment.initiate(sequelize);

// 모델(테이블) 간 관계 설정
User.associate(db);
Comment.associate(db);

module.exports = db;