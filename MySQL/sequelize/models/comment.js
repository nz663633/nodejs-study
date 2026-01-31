const Sequelize = require('sequelize');

class Comment extends Sequelize.Model {
    static initiate(sequelize) {
        Comment.init({
            comment: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW,
            },
        }, { // 모델에 대한 설정
            sequelize,
            timestamps: false,
            modelName: 'Comment',
            tableName: 'comments',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) { // Comment는 반드시 User에 속한다.
        db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });
        // ex. commenter = 3 -> User 테이블의 id = 3 유저가 이 댓글의 작성자
        // belongsTo로 인해 Comment 테이블에 외래키가 생기고,
        // foreignKey 옵션으로 인해 그 이름이 commenter로 정해짐
    };
};

module.exports = Comment;