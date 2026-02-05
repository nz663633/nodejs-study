const mongoose = require('mongoose');

const connect = () => { // 몽구스 연결
  if (process.env.NODE_ENV !== 'production') { // 배포가 아닐 경우(= 개발 모드일 경우)
    mongoose.set('debug', true);
  }
  mongoose.connect('mongodb://root:jwhjforever209!@localhost:27017/admin', {
    dbName: 'nodejs'
  }).then(() => {
    console.log("몽고디비 연결 성공");
  }).catch((err) => {
    console.error("몽고디비 연결 에러", err);
  });
};

mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});
mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  connect();
});

module.exports = connect;