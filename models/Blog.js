const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        post_name: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        post_body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        comment: {
            type: DataTypes.INTEGER,
            references: {
                model: 'comment',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freeseTableName: true,
        underscored: true,
        modelName: 'blog'
    }
);

module.exports = Blog;