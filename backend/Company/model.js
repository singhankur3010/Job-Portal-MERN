const { Sequelize, DataTypes } = require('sequelize')

const sequelize = require('../db');

const Company = sequelize.define(
    'Company', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    industry: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'created_at',
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
        field: 'updated_at',
    },
},

    {
        sequelize,
        modelName: 'Company',
        tableName: 'companies',
        timestamps: false,

    });

module.exports = Company;
