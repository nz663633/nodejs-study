const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initiate(sequelize) { // 모델(테이블) 정보 입력
        User.init({
            email: {
                type: Sequelize.STRING(40),
                allowNull: true,
                unique: true, // 이메일이 있을 경우 고유해야함
            },
            nick: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            provider: {
                type: Sequelize.ENUM('local', 'kakao'), // 미리 정해둔 local이나 kakao 값만 선택하도록 제한을 둠
                allowNull: false,
                defaultValue: 'local',
            },
            snsId: {
                type: Sequelize.STRING(30),
                allowNull: true,
            }
        }, {
            sequelize,
            timestamps: true, // createdAt, updateAt (유저 최초 생성일과, 유저 수정일을 자동으로 기록)
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true, // deletedAt 추가 (유저 삭제일 추가) - soft delete
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }

    static associate(db) { // 테이블 관계 입력
        db.User.hasMany(db.Post); // 일대다 관계(유저 1: 게시글 n)

        // 다대다 관계
        db.User.belongsToMany(db.User, { // 팔로워
            foreignKey: 'followingId', // 팔로잉하는 사람의 아이디를 찾아야
            as: 'Followers', // 그 사람의 팔로워들을 찾을 수 있다
            through: 'Follow'
        })
        db.User.belongsToMany(db.User, { // 팔로잉
            foreignKey: 'followerId', // 내 아이디를 찾아야
            as: 'Followings', // 내가 팔로잉하는 사람을 찾을 수 있다
            through: 'Follow'
        })
    }
}

module.exports = User;