const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const commentSchema = new Schema({
  commenter: {
    type: ObjectId, // ref 컬렉션의 ObjectId(= user.js)
    required: true,
    ref: 'User', // user schema의 _id를 가리킴(몽구스의 기능, MySQL의 join과 같은 기능)
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Comment', commentSchema);