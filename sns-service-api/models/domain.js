const Sequelize = require('sequelize');
const { associate } = require('./user');

class Domain extends Sequelize.Model {
    static initiate(sequelize) {
        Domain.init({
            host: { 
                type: Sequelize.STRING(80),
                allowNull: false,
            },
            type: { // 무료, 유료 회원 구분하기
                type: Sequelize.ENUM('free', 'premium'),
                allowNull: false,
            },
            clientSecret: {
                type: Sequelize.UUID, // UUID: 고유한 문자열(거의 겹치지 않는)
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'Domain',
            tableName: 'domains',
        })
    }

    static associate(db) {
        db.Domain.belongsTo(db.User);
    }
}

module.exports = Domain;