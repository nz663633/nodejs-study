const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init({
            // sequelize는 id를 자동으로 넣어주기 때문에 생략가능
            name: {
                type: Sequelize.STRING(20),
                allowNull: false, // NOT NULL
                unique: true,
            },
            age: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            married: {
                type: Sequelize.BOOLEAN, // true false
                allowNull: false,
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, { // 모델에 대한 설정
            sequelize,
            timestamps: false,
            underscored: false,
            paranoid: false,
            modelName: 'User', // 자바스크립트에서 쓰는 모델명
            tableName: 'users', // 실제 SQL에서 쓰는 테이블명
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) { // User 한 명은 Comment 여러 개를 가진다.(1대다 관계)
        db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
    }
};

module.exports = User;