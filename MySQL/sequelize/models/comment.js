const Sequelize = require('sequelize');

class Comment extends Sequelize.Model {
    static initiate(sequelize) {
        Comment.init({
            comment: {
                type: Sequelize.STRING(100),
                allowNullL: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW,
            },
        }, {
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
        db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' })
    };
};

module.exports = Comment;