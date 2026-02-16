const Sequelize = require('sequelize');

class Hashtag extends Sequelize.Model {
    static initiate(sequelize) { // 모델(테이블) 정보 입력
        Hashtag.init ({
            title: {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true, // unique는 고유성 유무(중복 허용 여부)
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: false,
            modelName: 'Hashtag',
            tableName: 'hashtags',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        })
    }

    static associate(db) { // 테이블 관계 입력
        db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
    }
}

module.exports = Hashtag;